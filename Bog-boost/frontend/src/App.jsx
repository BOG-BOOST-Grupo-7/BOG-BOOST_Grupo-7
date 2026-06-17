import { useState } from 'react'
import Header from './components/Header'
import Home from './components/Home'
import './App.css'
import Catalogo from './components/Catalogo'
import Negocios from './components/Negocios'
import Notificaciones from './components/Notificaciones'
import Footer from './components/Footer'
import Login from "./components/Login"
import Registro from './components/Registro'
import NegociosCrud from './components/NegociosCrud'
import ProductosCrud from './components/ProductosCrud'
import TipoDocumentosCrud from './components/TipoDocumentosCrud'
import UsuariosCrud from './components/UsuariosCrud'

function App() {
  const [pagina, setPagina] = useState("home")

  return (
    <>
      <Header setPagina={setPagina} />

      <main>
        {pagina === "home" && <Home />}
        {pagina === "catalogo" && <Catalogo />}
        {pagina === "negocios" && <Negocios />}
        {pagina === "notificaciones" && <Notificaciones />}
        {pagina === "login" && <Login setPagina={setPagina} />}
        {pagina === "registro" && <Registro setPagina={setPagina} />}
        {pagina === "negocioscrud" && <NegociosCrud />}
        {pagina === "productoscrud" && <ProductosCrud />}
        {pagina === "tipodocumentoscrud" && <TipoDocumentosCrud />}
        {pagina === "usuarioscrud" && <UsuariosCrud />}
      </main>

      <Footer />
    </>
  )
}
export default App
