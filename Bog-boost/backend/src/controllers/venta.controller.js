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

    const { data, error } = await supabase
      .schema("ventas")
      .from("venta")
      .select(`
            *,
            detalle_venta(*),
            seguimiento(*)
          `)
      .eq("id_venta", id)
      .single();

    if (error) {
      return res.status(404).json(error);
    }

    res.json(data);

  } catch (error) {
    res.status(500).json(error);
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

    // ==========================
    // VALIDAR PRODUCTOS
    // ==========================
    for (const item of productos) {

      const {
        data: producto,
        error
      } = await supabase
        .schema("catalogo")
        .from("producto")
        .select("*")
        .eq(
          "id_producto",
          item.id_producto
        )
        .single();

      if (error || !producto) {

        return res.status(404).json({
          mensaje:
            `Producto ${item.id_producto} no encontrado`
        });

      }

      if (
        producto.id_negocio !== id_negocio
      ) {

        return res.status(400).json({
          mensaje:
            `El producto ${producto.nombre_producto} no pertenece al negocio seleccionado`
        });

      }

      if (
        producto.stock <
        item.cantidad
      ) {

        return res.status(400).json({
          mensaje:
            `Stock insuficiente para ${producto.nombre_producto}`
        });

      }

      const subtotal =
        Number(producto.precio) *
        Number(item.cantidad);

      total += subtotal;

      detalles.push({
        id_producto:
          producto.id_producto,
        cantidad:
          item.cantidad,
        precio_unitario:
          producto.precio,
        subtotal
      });

    }

    // ==========================
    // VALIDAR MEDIO DE PAGO
    // ==========================
    const {
      data: medioPago,
      error: errorMedioPago
    } = await supabase
      .schema("negocio")
      .from("medio_pago")
      .select(`
        id_medio_pago,
        id_negocio
      `)
      .eq(
        "id_medio_pago",
        id_medio_pago
      )
      .eq(
        "id_negocio",
        id_negocio
      )
      .single();

    if (
      errorMedioPago ||
      !medioPago
    ) {

      return res.status(400).json({
        mensaje:
          "El medio de pago no pertenece al negocio seleccionado"
      });

    }

    // ==========================
    // VALIDAR MÉTODO DE ENVÍO
    // ==========================
    const {
      data: metodoEnvio,
      error: errorEnvio
    } = await supabase
      .schema("negocio")
      .from("metodo_envio")
      .select(`
        id_metodo_envio,
        id_negocio,
        costo_envio
      `)
      .eq(
        "id_metodo_envio",
        id_metodo_envio
      )
      .eq(
        "id_negocio",
        id_negocio
      )
      .single();

    if (
      errorEnvio ||
      !metodoEnvio
    ) {

      return res.status(400).json({
        mensaje:
          "El método de envío no pertenece al negocio seleccionado"
      });

    }

    // ==========================
    // SUMAR COSTO DE ENVÍO
    // ==========================
    const costoEnvio =
      Number(
        metodoEnvio.costo_envio
      );

    total += costoEnvio;

    // ==========================
    // CREAR VENTA
    // ==========================
    const {
      data,
      error: errorVenta
    } = await supabase
      .schema("ventas")
      .from("venta")
      .insert([
        {
          id_perfil:
            req.user.id,
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

      return res.status(400)
        .json(errorVenta);

    }

    const venta = data[0];

    // ==========================
    // CREAR DETALLES
    // ==========================
    for (const detalle of detalles) {

      const {
        error: errorDetalle
      } = await supabase
        .schema("ventas")
        .from("detalle_venta")
        .insert([
          {
            id_venta:
              venta.id_venta,
            ...detalle
          }
        ]);

      if (errorDetalle) {

        return res.status(400)
          .json(errorDetalle);

      }

      const {
        data: producto
      } = await supabase
        .schema("catalogo")
        .from("producto")
        .select("*")
        .eq(
          "id_producto",
          detalle.id_producto
        )
        .single();

      const nuevoStock =
        producto.stock -
        detalle.cantidad;

      await supabase
        .schema("catalogo")
        .from("producto")
        .update({
          stock:
            nuevoStock,
          estado_producto:
            nuevoStock === 0
              ? "AGOTADO"
              : "DISPONIBLE"
        })
        .eq(
          "id_producto",
          detalle.id_producto
        );

    }

    // ==========================
    // CREAR SEGUIMIENTO
    // ==========================
    const {
      error: errorSeguimiento
    } = await supabase
      .schema("ventas")
      .from("seguimiento")
      .insert([
        {
          id_venta:
            venta.id_venta,
          estado_seguimiento:
            "PENDIENTE",
          fecha_entrega:
            null
        }
      ]);

    if (errorSeguimiento) {

      return res.status(400)
        .json(errorSeguimiento);

    }

    res.status(201).json({
      mensaje:
        "Venta creada correctamente",
      venta,
      costo_envio:
        costoEnvio,
      total_pagado:
        total
    });

  } catch (error) {

    console.error(error);

    res.status(500)
      .json(error);

  }
};

export const actualizarVenta = async (req, res) => {
  try {
    const { id } = req.params;

    const {
      telefono,
      direccion
    } = req.body;

    const {
      data,
      error
    } = await supabase
      .schema("ventas")
      .from("venta")
      .update({
        telefono,
        direccion
      })
      .eq(
        "id_venta",
        id
      )
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
      .eq(
        "id_venta",
        id
      );

    await supabase
      .schema("ventas")
      .from("seguimiento")
      .delete()
      .eq(
        "id_venta",
        id
      );

    const { error } = await supabase
      .schema("ventas")
      .from("venta")
      .delete()
      .eq(
        "id_venta",
        id
      );

    if (error) {
      return res.status(400).json(error);
    }

    res.json({
      mensaje: "Venta eliminada"
    });

  } catch (error) {
    res.status(500).json(error);
  }
};

export const misCompras = async (req, res) => {
  try {

    const { data, error } = await supabase
      .schema("ventas")
      .from("venta")
      .select(`
        *,
        seguimiento(*)
      `)
      .eq(
        "id_perfil",
        req.user.id
      );

    if (error) {
      return res.status(400).json(error);
    }

    res.json(data);

  } catch (error) {
    res.status(500).json(error);
  }
};

export const misVentas = async (req, res) => {
  try {

    // Obtener los negocios del vendedor
    const {
      data: negocios,
      error: errorNegocios
    } = await supabase
      .schema("negocio")
      .from("negocio")
      .select("id_negocio")
      .eq(
        "id_perfil",
        req.user.id
      );

    if (errorNegocios) {
      return res.status(400).json(errorNegocios);
    }

    const idsNegocios = negocios.map(
      negocio => negocio.id_negocio
    );

    // Obtener las ventas de esos negocios
    const {
      data,
      error
    } = await supabase
      .schema("ventas")
      .from("venta")
      .select(`
        *,
        seguimiento(*)
      `)
      .in(
        "id_negocio",
        idsNegocios
      );

    if (error) {
      return res.status(400).json(error);
    }

    res.json(data);

  } catch (error) {

    res.status(500).json(error);

  }
};