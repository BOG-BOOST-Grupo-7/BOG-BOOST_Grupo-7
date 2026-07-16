import { Link } from "react-router-dom";
import "../../styles/AdminHome.css";

function AdminHome() {

    const opciones = [

        {
            titulo: "Negocios",
            descripcion: "Gestiona los negocios registrados",
            icono: "fas fa-store",
            color: "#F5B952",
            ruta: "/admin/negocios"
        },

        {
            titulo: "Usuarios",
            descripcion: "Administra los usuarios del sistema",
            icono: "fas fa-users",
            color: "#4CAF50",
            ruta: "/admin/usuarios"
        },

        {
            titulo: "Solicitudes",
            descripcion: "Aprueba o rechaza solicitudes",
            icono: "fas fa-file-signature",
            color: "#FF9800",
            ruta: "/admin/solicitudes"
        },

        {
            titulo: "PQRS",
            descripcion: "Gestiona peticiones y reclamos",
            icono: "fas fa-envelope",
            color: "#42A5F5",
            ruta: "/admin/pqrs"
        },

        {
            titulo: "Ventas",
            descripcion: "Consulta estadísticas de ventas",
            icono: "fas fa-chart-bar",
            color: "#9C27B0",
            ruta: "/admin/ventas"
        }

    ];

    return (

        <main className="admin-home">

            <div className="dashboard-grid">

                {opciones.map((item) => (

                    <Link
                        key={item.titulo}
                        to={item.ruta}
                        className="dashboard-card"
                    >

                        <div
                            className="card-icon"
                            style={{
                                background: `${item.color}20`,
                                color: item.color
                            }}
                        >

                            <i className={item.icono}></i>

                        </div>

                        <h3>

                            {item.titulo}

                        </h3>

                        <p>

                            {item.descripcion}

                        </p>

                    </Link>

                ))}

            </div>

        </main>

    );

}

export default AdminHome;