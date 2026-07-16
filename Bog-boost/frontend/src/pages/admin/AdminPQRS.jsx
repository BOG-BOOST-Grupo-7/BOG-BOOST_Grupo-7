import { useEffect, useMemo, useState } from "react";

import {
  listarPQRS,
  responderPQRS
} from "../../api/pqrsApi";

import {
  FaInbox,
  FaClock,
  FaCheckCircle,
  FaReply,
  FaFilter,
  FaUserCircle,
  FaEnvelope,
  FaCalendarAlt
} from "react-icons/fa";

import "../../styles/AdminPQRS.css";

function AdminPQRS() {

  const [pqrs, setPQRS] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [estadoFiltro, setEstadoFiltro] = useState("todos");
  const [respuestas, setRespuestas] = useState({});

  // ==========================
  // Cargar PQRS
  // ==========================

  const cargarPQRS = async () => {

    try {

      setCargando(true);

      const { data } = await listarPQRS();

      setPQRS(data);

    } catch (error) {

      console.error(error);

      alert("No fue posible cargar las PQRS.");

    } finally {

      setCargando(false);

    }

  };

  useEffect(() => {

    cargarPQRS();

  }, []);

  // ==========================
  // Cambiar respuesta
  // ==========================

  const cambiarRespuesta = (id, texto) => {

    setRespuestas((prev) => ({
      ...prev,
      [id]: texto
    }));

  };

  // ==========================
  // Guardar respuesta
  // ==========================

  const guardarRespuesta = async (id) => {

    const respuesta = respuestas[id];

    if (!respuesta?.trim()) {

      alert("Escribe una respuesta.");
      return;

    }

    try {

      await responderPQRS(id, respuesta);

      alert("Respuesta enviada.");

      cargarPQRS();

    } catch (error) {

      console.error(error);

      alert("No fue posible responder.");

    }

  };

  // ==========================
  // Filtro
  // ==========================

  const pqrsFiltradas = useMemo(() => {

    if (estadoFiltro === "todos") {
      return pqrs;
    }

    if (estadoFiltro === "pendiente") {
      return pqrs.filter(item => !item.respuesta_pqrs);
    }

    return pqrs.filter(item => item.respuesta_pqrs);

  }, [pqrs, estadoFiltro]);

  // ==========================
  // Resumen
  // ==========================

  const total = pqrs.length;

  const pendientes = pqrs.filter(
    item => !item.respuesta_pqrs
  ).length;

  const resueltos = pqrs.filter(
    item => item.respuesta_pqrs
  ).length;

  return (

    <div className="admin-pqrs">

      <h1 className="admin-pqrs-title">

        Gestión de PQRS

      </h1>

      {/* ========================== */}
      {/* Tarjetas */}
      {/* ========================== */}

      <div className="admin-pqrs-summary">

        <div className="admin-pqrs-card">

          <FaInbox />

          <span>

            Total

            <strong>{total}</strong>

          </span>

        </div>

        <div className="admin-pqrs-card">

          <FaClock />

          <span>

            Pendientes

            <strong>{pendientes}</strong>

          </span>

        </div>

        <div className="admin-pqrs-card">

          <FaCheckCircle />

          <span>

            Resueltas

            <strong>{resueltos}</strong>

          </span>

        </div>

      </div>

      {/* ========================== */}
      {/* Barra superior */}
      {/* ========================== */}

      <div className="admin-pqrs-action-bar">

        <div className="admin-pqrs-filter">

          <FaFilter />

          <select

            className="admin-pqrs-select"

            value={estadoFiltro}

            onChange={(e) =>
              setEstadoFiltro(e.target.value)
            }

          >

            <option value="todos">

              Todas

            </option>

            <option value="pendiente">

              Pendientes

            </option>

            <option value="resuelto">

              Resueltas

            </option>

          </select>

        </div>

      </div>

      {/* ========================== */}
      {/* Tabla */}
      {/* ========================== */}

      <div className="admin-pqrs-table-container">

        <table className="admin-pqrs-table">

          <thead>

            <tr>

              <th>Cliente</th>

              <th>Mensaje</th>

              <th>Respuesta</th>

              <th>Fecha</th>

              <th>Estado</th>

              <th>Acción</th>

            </tr>

          </thead>

          <tbody>

            {

              cargando

                ?

                <tr>

                  <td
                    colSpan="6"
                    className="admin-pqrs-loading"
                  >

                    Cargando...

                  </td>

                </tr>

                :

                pqrsFiltradas.length === 0

                  ?

                  <tr>

                    <td
                      colSpan="6"
                      className="admin-pqrs-loading"
                    >

                      No existen PQRS.

                    </td>

                  </tr>

                  :

                  pqrsFiltradas.map((item) => (

                    <tr key={item.id_pqrs}>

                      {/* Cliente */}

                      <td>

                        <div className="cliente-info">

                          <FaUserCircle />

                          <div>

                            <strong>

                              {

                                item.perfil

                                  ?

                                  `${item.perfil.primer_nombre ?? ""} ${item.perfil.segundo_nombre ?? ""} ${item.perfil.primer_apellido ?? ""} ${item.perfil.segundo_apellido ?? ""}`

                                  :

                                  "Sin información"

                              }

                            </strong>

                            <small>

                              {item.perfil?.correo}

                            </small>

                          </div>

                        </div>

                      </td>

                      {/* Mensaje */}

                      <td>

                        <div className="mensaje-box">

                          <FaEnvelope />

                          <p>

                            {item.mensaje_pqrs}

                          </p>

                        </div>

                      </td>

                      {/* Respuesta */}

                      <td>

                        <textarea

                          className="admin-pqrs-textarea"

                          value={
                            respuestas[item.id_pqrs]
                            ??
                            item.respuesta_pqrs
                            ??
                            ""
                          }

                          onChange={(e) =>
                            cambiarRespuesta(
                              item.id_pqrs,
                              e.target.value
                            )
                          }

                        />

                      </td>

                      {/* Fecha */}

                      <td>

                        <div className="fecha-box">

                          <FaCalendarAlt />

                          {

                            new Date(
                              item.fecha_pqrs
                            ).toLocaleDateString()

                          }

                        </div>

                      </td>

                      {/* Estado */}

                      <td>

                        {

                          item.respuesta_pqrs

                            ?

                            <span className="admin-pqrs-status-resolved">

                              Resuelta

                            </span>

                            :

                            <span className="admin-pqrs-status-pending">

                              Pendiente

                            </span>

                        }

                      </td>

                      {/* Botón */}

                      <td>

                        <button

                          className="admin-pqrs-btn"

                          onClick={() =>
                            guardarRespuesta(
                              item.id_pqrs
                            )
                          }

                        >

                          <FaReply />

                          Responder

                        </button>

                      </td>

                    </tr>

                  ))

            }

          </tbody>

        </table>

      </div>

    </div>

  );

}

export default AdminPQRS;