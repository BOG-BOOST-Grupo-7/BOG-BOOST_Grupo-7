import "./css/Login.css"
import { useState } from "react"
import { axiosClient } from "../api/axiosClient"

function Registro({ setPagina }) {
  const [nombre, setNombre] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError("")
    setLoading(true)

    try {
      // solo registrar (NO guardar sesión)
      await axiosClient.post("/register", {
        nombre,
        email,
        password,
      })

      alert("Registro exitoso. Ahora inicia sesión")

      // redirigir a login
      setPagina("login")

    } catch (err) {
      console.log(err.response?.data)

      const msg =
        err?.response?.data?.message ||
        err?.response?.data ||
        err?.message ||
        "Error desconocido"

      setError(msg || "El correo ya existe")
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="center">
      <form className="card-form" onSubmit={handleSubmit}>
        <h1>Registrarse</h1>

        <input
          type="text"
          placeholder="Nombre"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          required
        />

        <input
          type="email"
          placeholder="Correo"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <div className="input-password">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <span onClick={() => setShowPassword(!showPassword)}>
            👁️
          </span>
        </div>

        {error && <p className="error">{error}</p>}

        <button className="bold" disabled={loading}>
          {loading ? "Creando cuenta..." : "Registrarse"}
        </button>

        <a onClick={() => setPagina("login")}>
          ¿Ya tiene una cuenta?
        </a>
      </form>
    </main>
  )
}

export default Registro