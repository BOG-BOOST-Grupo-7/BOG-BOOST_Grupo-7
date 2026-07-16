import "../../styles/Registro.css"; // 👈 reutilizamos el mismo CSS
import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { loginUser } from "../../api/auth";
import { useAuth } from "../../context/AuthContext";
import { Link } from "react-router-dom";

function Login() {
  const navigate = useNavigate(); 
  const location = useLocation();
  const { login } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await loginUser({ email, password });

      const { session, user, perfil } = res.data;

      login(session, user, perfil);

      const rol = perfil?.rol?.nombre_rol;

      const destino = location.state?.from;

      switch (rol) {
        case "CLIENTE":
          navigate(destino || "/");
          break;
        case "VENDEDOR":
          navigate("/vendedor");
          break;
        case "SUPER_ADMIN":
          navigate("/admin");
          break;
        default:
          navigate("/");
      }
    } catch (err) {
      const msg =
        err?.response?.data?.message ||
        err?.response?.data?.mensaje ||
        err?.message ||
        "Error al iniciar sesión";

      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="registro-container">
      <div className="registro-card">

        <h2 className="registro-title">
          Iniciar Sesión
        </h2>

        <form onSubmit={handleSubmit} className="registro-form">

          <div className="form-group">
            <label>
              <i className="fas fa-envelope"></i>
              Correo
            </label>

            <input
              type="email"
              placeholder="tucorreo@ejemplo.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label>
              <i className="fas fa-lock"></i>
              Contraseña
            </label>

            <div className="password-wrapper">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Ingresa tu contraseña"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />

              <button
                type="button"
                className="toggle-password"
                onClick={() => setShowPassword(!showPassword)}
              >
                <i className={showPassword ? "fas fa-eye-slash" : "fas fa-eye"} />
              </button>
            </div>
          </div>

          {error && <p className="error">{error}</p>}

          <button
            type="submit"
            className="btn-registrar"
            disabled={loading}
          >
            <i className="fas fa-sign-in-alt"></i>
            {loading ? "Ingresando..." : "Iniciar Sesión"}
          </button>

        </form>

        <div className="registro-links">
          <Link to="/registro" className="link-login">
            <i className="fas fa-user-plus"></i>
            ¿No tienes cuenta? Regístrate
          </Link>
        </div>

      </div>
    </section>
  );
}

export default Login;