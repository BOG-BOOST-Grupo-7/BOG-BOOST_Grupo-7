import supabase from "../services/supabase.js";

export const listarVentas = async (req, res) => {
  try {
    const { data, error } = await supabase
      .schema("ventas")
      .from("venta")
      .select("*");

    if (error) {
      return res.status(400).json(error);
    }

    res.json(data);

  } catch (error) {
    res.status(500).json(error);
  }
};

export const obtenerVentaPorId = async (req, res) => {
  try {
    const { id } = req.params;

    // Con esta única consulta traes TODO: venta, detalle, productos y envíos
    const { data: venta, error } = await supabase
      .schema("ventas")
      .from("venta")
      .select(`
        *,
        seguimiento(*),
        medio_pago:id_medio_pago(nombre_medio),
        metodo_envio:id_metodo_envio(nombre_metodo, costo_envio),
        detalle_venta (
          *,
          producto:id_producto (nombre_producto, descripcion, imagen)
        )
      `)
      .eq("id_venta", id)
      .eq("id_perfil", req.user.id)
      .single();

    if (error || !venta) {
      return res.status(404).json({
        mensaje: "Venta no encontrada"
      });
    }

    return res.json(venta);

  } catch (error) {
    console.error(error);
    return res.status(500).json({
      mensaje: "Error interno del servidor"
    });
  }
};

export const confirmarCarrito = async (req, res) => {
  try {
    const {
      id_medio_pago,
      id_metodo_envio,
      telefono,
      direccion,
      carrito
    } = req.body;

    if (!carrito || carrito.length === 0) {
      return res.status(400).json({ mensaje: "El carrito está vacío" });
    }

    let total = 0;
    const detallesDB = [];
    const detallesRespuesta = [];

    // 1. Obtener ID Negocio del primer producto
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

    // 2. Validar productos, calcular total y preparar estructuras
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

    // 3. Validar medio de pago
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

    // 4. Validar método de envío
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

    // 5. Crear Venta
    const { data: ventaData, error: errorVenta } = await supabase
      .schema("ventas")
      .from("venta")
      .insert([{
        id_perfil: req.user.id,
        id_negocio,
        id_medio_pago,
        id_metodo_envio,
        telefono,
        direccion,
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

    // 6. Insertar Detalles, actualizar Stock y evaluar alerta de stock bajo
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

      console.log(`[DEBUG STOCK] Producto: ${prod.nombre_producto} | Stock Actual en DB: ${prod.stock} | Cantidad Vendida: ${detalle.cantidad} | Nuevo Stock Calculado: ${nuevoStock}`);

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
          const { error: errorNotifStock } = await supabase
            .schema("cliente")
            .from("notificacion")
            .insert([
              {
                id_perfil: negocioData.id_perfil,
                mensaje: `⚠️ Alerta: El producto "${prod.nombre_producto}" tiene stock bajo (Quedan ${nuevoStock} unidades).`,
                tipo: "ALERTA",
                estado_notificacion: false
              }
            ]);

          if (errorNotifStock) {
            console.error("❌ Error al enviar notificación de stock bajo:", errorNotifStock);
          } else {
            console.log(`✅ Alerta de stock bajo enviada para el producto: ${prod.nombre_producto}`);
          }
        } catch (errStock) {
          console.error("Error general en alerta de stock:", errStock);
        }
      }
    }

    // 7. Crear Seguimiento
    await supabase
      .schema("ventas")
      .from("seguimiento")
      .insert([{ id_venta: venta.id_venta, estado_seguimiento: "PENDIENTE", fecha_entrega: null }]);

    // 8. ENVIAR NOTIFICACIONES DE VENTA
    try {
      const notificaciones = [];

      if (req.user && req.user.id && venta?.id_venta) {
        notificaciones.push({
          id_perfil: req.user.id,
          mensaje: `¡Tu compra #${venta.id_venta} ha sido creada exitosamente!`,
          tipo: "INFORMATIVA",
          estado_notificacion: false
        });
      }

      if (!errorNegocio && negocioData && negocioData.id_perfil && venta?.id_venta) {
        notificaciones.push({
          id_perfil: negocioData.id_perfil,
          mensaje: `¡Has recibido una nueva venta (#${venta.id_venta}) en tu negocio!`,
          tipo: "ALERTA",
          estado_notificacion: false
        });
      }

      if (notificaciones.length > 0) {
        const { error: errorInsertarNotif } = await supabase
          .schema("cliente")
          .from("notificacion")
          .insert(notificaciones);

        if (errorInsertarNotif) {
          console.error("❌ ERROR SUPABASE NOTIFICACIONES:", JSON.stringify(errorInsertarNotif, null, 2));
        } else {
          console.log("✅ Notificaciones de venta creadas correctamente para cliente y vendedor.");
        }
      }

    } catch (notifError) {
      console.error("Error general en el bloque de notificaciones:", notifError);
    }

    // 9. Respuesta enriquecida
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

export const crearVenta = async (req, res) => {
  try {

    const {
      id_negocio,
      id_medio_pago,
      id_metodo_envio,
      telefono,
      direccion,
      productos
    } = req.body;

    let total = 0;
    const detalles = [];

    for (const item of productos) {

      const { data: producto, error } = await supabase
        .schema("catalogo")
        .from("producto")
        .select("*")
        .eq("id_producto", item.id_producto)
        .single();

      if (error || !producto) {
        return res.status(404).json({
          mensaje: `Producto ${item.id_producto} no encontrado`
        });
      }

      if (producto.id_negocio !== id_negocio) {
        return res.status(400).json({
          mensaje: `El producto ${producto.nombre_producto} no pertenece al negocio seleccionado`
        });
      }

      if (producto.stock < item.cantidad) {
        return res.status(400).json({
          mensaje: `Stock insuficiente para ${producto.nombre_producto}`
        });
      }

      const subtotal = Number(producto.precio) * Number(item.cantidad);
      total += subtotal;

      detalles.push({
        id_producto: producto.id_producto,
        cantidad: item.cantidad,
        precio_unitario: producto.precio,
        subtotal
      });

    }

    const { data: medioPago, error: errorMedioPago } = await supabase
      .schema("negocio")
      .from("medio_pago")
      .select(`id_medio_pago, id_negocio`)
      .eq("id_medio_pago", id_medio_pago)
      .eq("id_negocio", id_negocio)
      .single();

    if (errorMedioPago || !medioPago) {
      return res.status(400).json({
        mensaje: "El medio de pago no pertenece al negocio seleccionado"
      });
    }

    const { data: metodoEnvio, error: errorEnvio } = await supabase
      .schema("negocio")
      .from("metodo_envio")
      .select(`id_metodo_envio, id_negocio, costo_envio`)
      .eq("id_metodo_envio", id_metodo_envio)
      .eq("id_negocio", id_negocio)
      .single();

    if (errorEnvio || !metodoEnvio) {
      return res.status(400).json({
        mensaje: "El método de envío no pertenece al negocio seleccionado"
      });
    }

    const costoEnvio = Number(metodoEnvio.costo_envio);
    total += costoEnvio;

    const { data, error: errorVenta } = await supabase
      .schema("ventas")
      .from("venta")
      .insert([
        {
          id_perfil: req.user.id,
          id_negocio,
          id_medio_pago,
          id_metodo_envio,
          telefono,
          direccion,
          total
        }
      ])
      .select();

    if (errorVenta) {
      return res.status(400).json(errorVenta);
    }

    const venta = data[0];

    for (const detalle of detalles) {

      const { error: errorDetalle } = await supabase
        .schema("ventas")
        .from("detalle_venta")
        .insert([{ id_venta: venta.id_venta, ...detalle }]);

      if (errorDetalle) {
        return res.status(400).json(errorDetalle);
      }

      const { data: producto } = await supabase
        .schema("catalogo")
        .from("producto")
        .select("*")
        .eq("id_producto", detalle.id_producto)
        .single();

      const nuevoStock = producto.stock - detalle.cantidad;

      await supabase
        .schema("catalogo")
        .from("producto")
        .update({
          stock: nuevoStock,
          estado_producto: nuevoStock === 0 ? "AGOTADO" : "DISPONIBLE"
        })
        .eq("id_producto", detalle.id_producto);

    }

    const { error: errorSeguimiento } = await supabase
      .schema("ventas")
      .from("seguimiento")
      .insert([
        {
          id_venta: venta.id_venta,
          estado_seguimiento: "PENDIENTE",
          fecha_entrega: null
        }
      ]);

    if (errorSeguimiento) {
      return res.status(400).json(errorSeguimiento);
    }

    res.status(201).json({
      mensaje: "Venta creada correctamente",
      venta,
      costo_envio: costoEnvio,
      total_pagado: total
    });

  } catch (error) {
    console.error(error);
    res.status(500).json(error);
  }
};

export const actualizarVenta = async (req, res) => {
  try {
    const { id } = req.params;
    const { telefono, direccion } = req.body;

    const { data, error } = await supabase
      .schema("ventas")
      .from("venta")
      .update({ telefono, direccion })
      .eq("id_venta", id)
      .select();

    if (error) {
      return res.status(400).json(error);
    }

    res.json(data);

  } catch (error) {
    res.status(500).json(error);
  }
};

export const eliminarVenta = async (req, res) => {
  try {
    const { id } = req.params;

    await supabase
      .schema("ventas")
      .from("detalle_venta")
      .delete()
      .eq("id_venta", id);

    await supabase
      .schema("ventas")
      .from("seguimiento")
      .delete()
      .eq("id_venta", id);

    const { error } = await supabase
      .schema("ventas")
      .from("venta")
      .delete()
      .eq("id_venta", id);

    if (error) {
      return res.status(400).json(error);
    }

    res.json({ mensaje: "Venta eliminada" });

  } catch (error) {
    res.status(500).json(error);
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

    // 4. RESPUESTA FINAL CON DATOS SEMANALES
    res.json({
      usuariosPorMes,
      usuariosPorSemana, // 👈 NUEVO
      ventasPorMes,
      ventasPorSemana,   // 👈 NUEVO
      ventasPorNegocio,
      productosMasVendidos
    });

  } catch (error) {
    console.error("Error crítico en reporte:", error);
    res.status(500).json({ mensaje: "Error interno del servidor", error: error.message });
  }
};