import "./css/Header.css"
import { useState, useEffect } from "react"
import logo from "../assets/logo.png"
import campana from "../assets/campana.png"
import menu from "../assets/menu.png"

function Header({ setPagina }) {
  const [open, setOpen] = useState(false)
  const [user, setUser] = useState(null)

  useEffect(() => {
    const storedUser = localStorage.getItem("user")
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }
  }, [])

  const handleLogout = () => {
    localStorage.removeItem("accessToken")
    localStorage.removeItem("user")

    setUser(null)
    setOpen(false)
    setPagina("home")

    window.location.reload()
  }

  return (
    <header className="header">
      <div className="top">
        <img src={logo} className="logo" />

        <ul className="nav">
          <li onClick={() => setPagina("home")}>Inicio</li>
          <li onClick={() => setPagina("catalogo")}>Catalogo</li>
          <li onClick={() => setPagina("negocios")}>Negocios</li>
        </ul>
      </div>

      <div className="actions">
        <input className="search" placeholder="Buscar" />

        {/* 🔥 usuario */}
        {user && (
          <p className="user-name">
            Hola, {user?.nombre || user?.name || user?.email}
          </p>
        )}

        <img src={campana} className="icon" />

        <div className="menu-container">
          <img
            src={menu}
            className="icon"
            onClick={() => setOpen(!open)}
          />

          {open && (
            <div className="menu-dropdown">

              {/* menú sin iniciar sesión */}
              {!user && (
                <>
                  <p onClick={() => {
                    setPagina("registro")
                    setOpen(false)
                  }}>
                    Registro
                  </p>

                  <p onClick={() => {
                    setPagina("login")
                    setOpen(false)
                  }}>
                    Iniciar sesión
                  </p>
                </>
              )}

              {/* menú al iniciar sesión */}
              {user && (
                <>
                  <p onClick={() => {
                    setPagina("negocioscrud")
                    setOpen(false)
                  }}>
                    Negocios CRUD
                  </p>

                  <p onClick={() => {
                    setPagina("productoscrud")
                    setOpen(false)
                  }}>
                    Productos CRUD
                  </p>

                  <p onClick={() => {
                    setPagina("tipodocumentoscrud")
                    setOpen(false)
                  }}>
                    Tipo Documentos CRUD
                  </p>

                  <p onClick={() => {
                    setPagina("usuarioscrud")
                    setOpen(false)
                  }}>
                    Usuarios CRUD
                  </p>

                  <p onClick={handleLogout}>
                    Cerrar sesión
                  </p>
                </>
              )}

            </div>
          )}
        </div>
      </div>
    </header>
  )
}

export default Header