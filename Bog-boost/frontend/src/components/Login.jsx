import "./css/Login.css"
import { useState } from "react"
import { axiosClient } from "../api/axiosClient"

function Login({ setPagina }) {
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
      const res = await axiosClient.post("/login", {
        email,
        password,
      })

      const { accessToken, user } = res.data

      localStorage.setItem("accessToken", accessToken)
      localStorage.setItem("user", JSON.stringify(user))

      alert(`Bienvenido ${user.email}`)

      setPagina("home")

      window.location.reload() // 🔥 CLAVE

    } catch (err) {
      console.log(err.response?.data)

      const msg =
        err?.response?.data?.message ||
        err?.response?.data ||
        err?.message ||
        "Error desconocido"

      setError(msg)
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="center">
      <form className="card-form" onSubmit={handleSubmit}>
        <h1>Iniciar Sesión</h1>

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
          {loading ? "Ingresando..." : "Ingresar"}
        </button>

        <a>¿Olvidó su contraseña?</a>

        <a onClick={() => setPagina("registro")}>
          ¿Aún no tiene una cuenta?
        </a>
      </form>
    </main>
  )
}

export default Login