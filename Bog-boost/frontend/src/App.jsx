import { Routes, Route } from "react-router-dom";

// Layouts
import ClienteLayout from "./layouts/ClienteLayout";

// Cliente
import Home from "./pages/cliente/Home";
import Perfil from "./pages/cliente/Perfil";
import RegistrarNegocio from "./pages/cliente/RegistrarNegocio";
import Negocios from "./pages/cliente/Negocios";
import NegocioDetalle from "./pages/cliente/NegocioDetalle";
import PQRS from "./pages/cliente/PQRS";

// Auth
import Login from "./pages/auth/Login";
import Registro from "./pages/auth/Registro";

// Admin
import AdminHome from "./pages/admin/AdminHome";
import SolicitudesAdmin from "./pages/admin/SolicitudesAdmin";
import ListaNegociosAdmin from "./pages/admin/ListaNegociosAdmin";
import ListaUsuariosAdmin from "./pages/admin/ListaUsuariosAdmin";
import AdminPQRS from "./pages/admin/AdminPQRS";
import Notificaciones from "./pages/cliente/Notificaciones";

// Vendedor
import PerfilNegocio from "./pages/vendedor/PerfilNegocio";
import DetalleProducto from "./components/home/DetalleProducto";
import Carrito from "./pages/cliente/Carrito";
import AdminMovimientoStock from "./pages/vendedor/MovimientoStock";


function App() {
  return (
    <Routes>

      {/* CLIENTE */}
      <Route path="/" element={<ClienteLayout />}>
        <Route index element={<Home />} />
        <Route path="login" element={<Login />} />
        <Route path="registro" element={<Registro />} />
        <Route path="perfil" element={<Perfil />} />
        <Route path="registrar-negocio" element={<RegistrarNegocio />} />
        <Route path="/admin" element={<AdminHome />} />
        <Route path="admin/solicitudes" element={<SolicitudesAdmin />} />
        <Route path="admin/negocios" element={<ListaNegociosAdmin />} />
        <Route path="admin/usuarios" element={<ListaUsuariosAdmin />} />
        <Route path="/notificaciones" element={<Notificaciones />} />
        <Route path="/vendedor" element={<PerfilNegocio />} />
        <Route path="/producto/:id" element={<DetalleProducto />} />
        <Route path="/carrito" element={<Carrito />} />
        <Route path="/negocios" element={<Negocios />} />
        <Route path="/negocios/:id" element={<NegocioDetalle />} />
        <Route path="/contacto" element={<PQRS />} />
        <Route path="/admin/pqrs" element={<AdminPQRS />} />
        <Route path="/stock" element={<AdminMovimientoStock />} />
      </Route>

    </Routes>
  );
}

export default App;