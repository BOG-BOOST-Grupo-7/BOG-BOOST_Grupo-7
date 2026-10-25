import supabase from "../services/supabase.js";

const telefonoRegex = /^\d{10}$/;
const direccionRegex = /^[A-Za-z0-9ÁÉÍÓÚáéíóúÑñ#\-\s,\.]+$/;

export const confirmarCarrito = async (req, res) => {
  try {
    const {
      id_medio_pago,
      id_metodo_envio,
      telefono,
      direccion,
      carrito
    } = req.body;

    // Validaciones iniciales
    if (!carrito || carrito.length === 0) {
      return res.status(400).json({ mensaje: "El carrito está vacío" });
    }
    if (!id_medio_pago) {
      return res.status(400).json({ mensaje: "Selecciona un medio de pago." });
    }
    if (!id_metodo_envio) {
      return res.status(400).json({ mensaje: "Selecciona un método de envío." });
    }
    if (!telefono || !telefonoRegex.test(String(telefono).trim())) {
      return res.status(400).json({ mensaje: "El teléfono debe tener exactamente 10 números." });
    }
    if (!direccion || !direccion.trim()) {
      return res.status(400).json({ mensaje: "La dirección es obligatoria." });
    }
    if (!direccionRegex.test(direccion.trim())) {
      return res.status(400).json({ mensaje: "La dirección contiene caracteres no permitidos." });
    }
    if (direccion.trim().length < 10 || direccion.trim().length > 150) {
      return res.status(400).json({ mensaje: "La dirección debe tener entre 10 y 150 caracteres." });
    }

    let total = 0;
    const detallesDB = [];
    const detallesRespuesta = [];

    const { data: primerProducto, error: errorPrimerProducto } = await supabase
      .schema("catalogo")
      .from("producto")
      .select("id_negocio")
      .eq("id_producto", carrito[0].id_producto)
      .single();

    if (errorPrimerProducto || !primerProducto) {
      return res.status(404).json({ mensaje: "Producto no encontrado" });
    }

    const id_negocio = primerProducto.id_negocio;

    for (const item of carrito) {
      const { data: producto, error } = await supabase
        .schema("catalogo")
        .from("producto")
        .select("*")
        .eq("id_producto", item.id_producto)
        .single();

      if (error || !producto) {
        return res.status(404).json({ mensaje: `Producto ${item.id_producto} no encontrado` });
      }

      if (producto.id_negocio !== id_negocio) {
        return res.status(400).json({ mensaje: "Todos los productos deben pertenecer al mismo negocio." });
      }

      if (producto.stock < item.cantidad) {
        return res.status(400).json({ mensaje: `Stock insuficiente para ${producto.nombre_producto}` });
      }

      const subtotal = Number(producto.precio) * Number(item.cantidad);
      total += subtotal;

      detallesDB.push({
        id_producto: producto.id_producto,
        cantidad: item.cantidad,
        precio_unitario: producto.precio,
        subtotal
      });

      detallesRespuesta.push({
        cantidad: item.cantidad,
        subtotal,
        producto: { nombre_producto: producto.nombre_producto }
      });
    }

    const { data: medioPago, error: errorMedioPago } = await supabase
      .schema("negocio")
      .from("medio_pago")
      .select("*")
      .eq("id_medio_pago", id_medio_pago)
      .eq("id_negocio", id_negocio)
      .single();

    if (errorMedioPago || !medioPago) {
      return res.status(400).json({ mensaje: "El medio de pago no pertenece al negocio." });
    }

    const { data: metodoEnvio, error: errorEnvio } = await supabase
      .schema("negocio")
      .from("metodo_envio")
      .select("*")
      .eq("id_metodo_envio", id_metodo_envio)
      .eq("id_negocio", id_negocio)
      .single();

    if (errorEnvio || !metodoEnvio) {
      return res.status(400).json({ mensaje: "El método de envío no pertenece al negocio." });
    }

    total += Number(metodoEnvio.costo_envio);

    const { data: ventaData, error: errorVenta } = await supabase
      .schema("ventas")
      .from("venta")
      .insert([{
        id_perfil: req.user.id,
        id_negocio,
        id_medio_pago,
        id_metodo_envio,
        telefono: telefono.trim(),
        direccion: direccion.trim(),
        total
      }])
      .select();

    if (errorVenta) return res.status(400).json(errorVenta);
    const venta = ventaData[0];

    const { data: negocioData, error: errorNegocio } = await supabase
      .schema("negocio")
      .from("negocio")
      .select("id_perfil")
      .eq("id_negocio", id_negocio)
      .single();

    if (errorNegocio) {
      console.error("Error al buscar el perfil del vendedor del negocio:", errorNegocio);
    }

    for (const detalle of detallesDB) {
      await supabase
        .schema("ventas")
        .from("detalle_venta")
        .insert([{ id_venta: venta.id_venta, ...detalle }]);

      const { data: prod } = await supabase
        .schema("catalogo")
        .from("producto")
        .select("stock, nombre_producto")
        .eq("id_producto", detalle.id_producto)
        .single();

      const nuevoStock = prod.stock - detalle.cantidad;

      await supabase
        .schema("catalogo")
        .from("producto")
        .update({
          stock: nuevoStock,
          estado_producto: nuevoStock === 0 ? "AGOTADO" : "DISPONIBLE"
        })
        .eq("id_producto", detalle.id_producto);

      if (nuevoStock <= 2 && !errorNegocio && negocioData?.id_perfil) {
        try {
          await supabase
            .schema("cliente")
            .from("notificacion")
            .insert([{
              id_perfil: negocioData.id_perfil,
              mensaje: `⚠️ Alerta: El producto "${prod.nombre_producto}" tiene stock bajo (Quedan ${nuevoStock} unidades).`,
              tipo: "ALERTA",
              estado_notificacion: false
            }]);
        } catch (errStock) {
          console.error("Error general en alerta de stock:", errStock);
        }
      }
    }

    await supabase
      .schema("ventas")
      .from("seguimiento")
      .insert([{ id_venta: venta.id_venta, estado_seguimiento: "PENDIENTE", fecha_entrega: null }]);

    try {
      const notificaciones = [];
      if (req.user?.id && venta?.id_venta) {
        notificaciones.push({
          id_perfil: req.user.id,
          mensaje: `¡Tu compra #${venta.id_venta} ha sido creada exitosamente!`,
          tipo: "INFORMATIVA",
          estado_notificacion: false
        });
      }
      if (!errorNegocio && negocioData?.id_perfil && venta?.id_venta) {
        notificaciones.push({
          id_perfil: negocioData.id_perfil,
          mensaje: `¡Has recibido una nueva venta (#${venta.id_venta}) en tu negocio!`,
          tipo: "ALERTA",
          estado_notificacion: false
        });
      }
      if (notificaciones.length > 0) {
        await supabase.schema("cliente").from("notificacion").insert(notificaciones);
      }
    } catch (notifError) {
      console.error("Error general en el bloque de notificaciones:", notifError);
    }

    return res.status(201).json({
      mensaje: "Compra realizada correctamente.",
      venta: {
        ...venta,
        detalle_venta: detallesRespuesta,
        medio_pago: medioPago,
        metodo_envio: metodoEnvio
      }
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ mensaje: "Error interno del servidor" });
  }
};

export const obtenerDatosUltimaCompra = async (req, res) => {
  try {
    const { data, error } = await supabase
      .schema("ventas")
      .from("venta")
      .select("telefono, direccion")
      .eq("id_perfil", req.user.id)
      .order("fecha_venta", { ascending: false })
      .limit(1)
      .maybeSingle();

    if (error) {
      return res.status(400).json(error);
    }

    return res.json({
      telefono: data?.telefono || "",
      direccion: data?.direccion || ""
    });
  } catch (error) {
    console.error("Error obteniendo datos de última compra:", error);
    return res.status(500).json({ mensaje: "Error interno del servidor" });
  }
};


export const misCompras = async (req, res) => {
  try {
    const { data: ventas, error: errorVentas } = await supabase
      .schema("ventas")
      .from("venta")
      .select(`*, seguimiento(*)`)
      .eq("id_perfil", req.user.id);

    if (errorVentas) {
      console.error("Error al obtener ventas:", errorVentas);
      return res.status(400).json(errorVentas);
    }

    const ventasEnriquecidas = await Promise.all(
      ventas.map(async (venta) => {
        let medio_pago = null;
        if (venta.id_medio_pago) {
          const { data: mp } = await supabase
            .schema("negocio")
            .from("medio_pago")
            .select("nombre_medio")
            .eq("id_medio_pago", venta.id_medio_pago)
            .single();
          medio_pago = mp;
        }

        let metodo_envio = null;
        if (venta.id_metodo_envio) {
          const { data: me } = await supabase
            .schema("negocio")
            .from("metodo_envio")
            .select("nombre_metodo, costo_envio")
            .eq("id_metodo_envio", venta.id_metodo_envio)
            .single();
          metodo_envio = me;
        }

        const { data: detalles } = await supabase
          .schema("ventas")
          .from("detalle_venta")
          .select("*")
          .eq("id_venta", venta.id_venta);

        const detalle_venta = await Promise.all(
          (detalles || []).map(async (detalle) => {
            let producto = null;
            if (detalle.id_producto) {
              const { data: prod } = await supabase
                .schema("catalogo")
                .from("producto")
                .select("nombre_producto, descripcion, imagen")
                .eq("id_producto", detalle.id_producto)
                .single();
              producto = prod;
            }
            return { ...detalle, producto };
          })
        );

        return {
          ...venta,
          medio_pago,
          metodo_envio,
          detalle_venta
        };
      })
    );

    res.json(ventasEnriquecidas);

  } catch (error) {
    console.error("Error en servidor:", error);
    res.status(500).json(error);
  }
};

export const misVentas = async (req, res) => {
  try {
    const { data: negocios, error: errorNegocios } = await supabase
      .schema("negocio")
      .from("negocio")
      .select("id_negocio")
      .eq("id_perfil", req.user.id);

    if (errorNegocios) {
      return res.status(400).json(errorNegocios);
    }

    if (!negocios || negocios.length === 0) {
      return res.json([]);
    }

    const idsNegocios = negocios.map(n => n.id_negocio);

    const { data: ventas, error } = await supabase
      .schema("ventas")
      .from("venta")
      .select(`
        *,
        seguimiento:seguimiento(
          id_seguimiento,
          estado_seguimiento,
          fecha_entrega,
          id_venta
        )
      `)
      .in("id_negocio", idsNegocios);

    if (error) {
      return res.status(400).json(error);
    }

    const ventasEnriquecidas = await Promise.all(
      ventas.map(async (venta) => {
        let medio_pago = null;
        if (venta.id_medio_pago) {
          const { data: mp } = await supabase
            .schema("negocio")
            .from("medio_pago")
            .select("nombre_medio")
            .eq("id_medio_pago", venta.id_medio_pago)
            .single();
          medio_pago = mp;
        }

        let metodo_envio = null;
        if (venta.id_metodo_envio) {
          const { data: me } = await supabase
            .schema("negocio")
            .from("metodo_envio")
            .select("nombre_metodo, costo_envio")
            .eq("id_metodo_envio", venta.id_metodo_envio)
            .single();
          metodo_envio = me;
        }

        let perfil = null;
        if (venta.id_perfil) {
          const { data: pf } = await supabase
            .schema("cliente")
            .from("perfil")
            .select("primer_nombre, segundo_nombre, primer_apellido, segundo_apellido")
            .eq("id_perfil", venta.id_perfil)
            .maybeSingle();
          perfil = pf;
        }

        const { data: detalles } = await supabase
          .schema("ventas")
          .from("detalle_venta")
          .select("*")
          .eq("id_venta", venta.id_venta);

        const detalle_venta = await Promise.all(
          (detalles || []).map(async (detalle) => {
            let producto = null;
            if (detalle.id_producto) {
              const { data: prod } = await supabase
                .schema("catalogo")
                .from("producto")
                .select("nombre_producto, descripcion, imagen")
                .eq("id_producto", detalle.id_producto)
                .single();
              producto = prod;
            }
            return { ...detalle, producto };
          })
        );

        let seguimientoArray = venta.seguimiento;
        if (!seguimientoArray || (Array.isArray(seguimientoArray) && seguimientoArray.length === 0)) {
          seguimientoArray = [{ estado_seguimiento: "PENDIENTE", id_venta: venta.id_venta, id_seguimiento: null }];
        } else if (!Array.isArray(seguimientoArray)) {
          seguimientoArray = [seguimientoArray];
        }

        return {
          ...venta,
          seguimiento: seguimientoArray,
          medio_pago,
          metodo_envio,
          perfil,
          detalle_venta
        };
      })
    );

    res.json(ventasEnriquecidas);
  } catch (error) {
    console.error("Error en servidor (misVentas):", error);
    res.status(500).json(error);
  }
};

// =====================================================
// REPORTES: usuarios, ventas, negocios y productos top
// =====================================================
export const obtenerReportes = async (req, res) => {
  try {
    // Función auxiliar para obtener la fecha del Lunes de esa semana (formato YYYY-MM-DD)
    const obtenerLunes = (fechaString) => {
      const fecha = new Date(fechaString);
      const dia = fecha.getDay() || 7; // Convierte el domingo (0) a 7
      fecha.setDate(fecha.getDate() - dia + 1);
      return fecha.toISOString().split("T")[0];
    };

    // 1. USUARIOS REGISTRADOS POR MES Y SEMANA
    const { data: perfiles, error: errorPerfiles } = await supabase
      .schema("cliente")
      .from("perfil")
      .select("fecha_creacion")
      .order("fecha_creacion", { ascending: true });

    if (errorPerfiles) throw new Error("Error en perfiles");

    const usuariosPorMes = {};
    const usuariosPorSemana = {};

    perfiles.forEach((perfil) => {
      if (perfil.fecha_creacion) {
        const mes = perfil.fecha_creacion.slice(0, 7);
        usuariosPorMes[mes] = (usuariosPorMes[mes] || 0) + 1;

        const semana = obtenerLunes(perfil.fecha_creacion);
        usuariosPorSemana[semana] = (usuariosPorSemana[semana] || 0) + 1;
      }
    });

    // 2. VENTAS Y TOTALES POR MES Y SEMANA
    const { data: ventas, error: errorVentas } = await supabase
      .schema("ventas")
      .from("venta")
      .select("id_venta, id_negocio, fecha_venta, total")
      .order("fecha_venta", { ascending: true });

    if (errorVentas) throw new Error("Error en ventas");

    const ventasPorMes = {};
    const ventasPorSemana = {};

    ventas.forEach((venta) => {
      if (venta.fecha_venta) {
        // Agrupación por mes
        const mes = venta.fecha_venta.slice(0, 7);
        if (!ventasPorMes[mes]) ventasPorMes[mes] = { cantidad_ventas: 0, ingresos_totales: 0 };
        ventasPorMes[mes].cantidad_ventas += 1;
        ventasPorMes[mes].ingresos_totales += Number(venta.total || 0);

        // Agrupación por semana
        const semana = obtenerLunes(venta.fecha_venta);
        if (!ventasPorSemana[semana]) ventasPorSemana[semana] = { cantidad_ventas: 0, ingresos_totales: 0 };
        ventasPorSemana[semana].cantidad_ventas += 1;
        ventasPorSemana[semana].ingresos_totales += Number(venta.total || 0);
      }
    });

    // 2.1 VENTAS POR NEGOCIO
    const { data: negocios, error: errorNegocios } = await supabase
      .schema("negocio")
      .from("negocio")
      .select("id_negocio, nombre_negocio, logo");

    if (errorNegocios) throw new Error("Error en negocios");

    const negociosDict = {};
    negocios.forEach(n => {
      negociosDict[n.id_negocio] = { nombre: n.nombre_negocio, logo: n.logo };
    });

    const ventasPorNegocioMap = {};
    ventas.forEach((venta) => {
      const idNegocio = venta.id_negocio;
      const infoNegocio = negociosDict[idNegocio];

      if (!ventasPorNegocioMap[idNegocio]) {
        ventasPorNegocioMap[idNegocio] = {
          nombre_negocio: infoNegocio?.nombre || "Negocio desconocido",
          logo: infoNegocio?.logo || "",
          cantidad_ventas: 0,
          ingresos_totales: 0
        };
      }
      ventasPorNegocioMap[idNegocio].cantidad_ventas += 1;
      ventasPorNegocioMap[idNegocio].ingresos_totales += Number(venta.total || 0);
    });

    const ventasPorNegocio = Object.values(ventasPorNegocioMap).sort((a, b) => b.ingresos_totales - a.ingresos_totales);

    // 3. PRODUCTOS MÁS VENDIDOS
    const { data: detalles, error: errorDetalles } = await supabase
      .schema("ventas")
      .from("detalle_venta")
      .select("cantidad, id_producto");

    if (errorDetalles) throw new Error("Error en detalles_venta");

    const { data: productos, error: errorProductos } = await supabase
      .schema("catalogo")
      .from("producto")
      .select("id_producto, nombre_producto, imagen, precio");

    if (errorProductos) throw new Error("Error en productos");

    const productosDict = {};
    productos.forEach(p => { productosDict[p.id_producto] = p; });

    const productosMap = {};
    detalles.forEach((item) => {
      const id = item.id_producto;
      const prodInfo = productosDict[id];

      if (!productosMap[id]) {
        productosMap[id] = {
          nombre: prodInfo?.nombre_producto || "Producto desconocido",
          imagen: prodInfo?.imagen || "",
          total_vendidos: 0
        };
      }
      productosMap[id].total_vendidos += item.cantidad;
    });

    const productosMasVendidos = Object.values(productosMap)
      .sort((a, b) => b.total_vendidos - a.total_vendidos)
      .slice(0, 5);

    
    res.json({
      usuariosPorMes,
      usuariosPorSemana, 
      ventasPorMes,
      ventasPorSemana,   
      ventasPorNegocio,
      productosMasVendidos
    });

  } catch (error) {
    console.error("Error crítico en reporte:", error);
    res.status(500).json({ mensaje: "Error interno del servidor", error: error.message });
  }
};