import "../../styles/Registro.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../../api/auth";
import { Link } from "react-router-dom";

function Registro() {
  const navigate = useNavigate();

  const [nombre, setNombre] = useState("");
  const [telefono, setTelefono] = useState("");
  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const passwordValida =
    password.length >= 8 &&
    /[A-Z]/.test(password) &&
    /[a-z]/.test(password) &&
    /[0-9]/.test(password) &&
    !/\s/.test(password) &&
    !/[¡¿"ºª·`´ç]/.test(password);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");

    // ===== VALIDAR NOMBRE =====
    const nombreRegex = /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/;

    if (!nombre.trim()) {
      setError("Debe ingresar su nombre");
      return;
    }

    if (!nombreRegex.test(nombre)) {
      setError("El nombre solo puede contener letras");
      return;
    }

    // ===== VALIDAR CORREO =====
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      setError("Ingrese un correo electrónico válido");
      return;
    }

    // ===== VALIDAR CONTRASEÑA =====
    if (password.length < 8) {
      setError(
        "La contraseña debe tener mínimo 8 caracteres"
      );
      return;
    }

    if (!/[A-Z]/.test(password)) {
      setError(
        "La contraseña debe tener al menos una mayúscula"
      );
      return;
    }

    if (!/[a-z]/.test(password)) {
      setError(
        "La contraseña debe tener al menos una minúscula"
      );
      return;
    }

    if (!/[0-9]/.test(password)) {
      setError(
        "La contraseña debe tener al menos un número"
      );
      return;
    }

    if (/\s/.test(password)) {
      setError(
        "La contraseña no puede contener espacios"
      );
      return;
    }

    if (/[¡¿"ºª·`´ç]/.test(password)) {
      setError(
        "La contraseña contiene caracteres no permitidos"
      );
      return;
    }

    // ===== CONFIRMAR CONTRASEÑA =====
    if (password !== confirmPassword) {
      setError("Las contraseñas no coinciden");
      return;
    }

    setLoading(true);

    try {
      await registerUser({
        primer_nombre: nombre,
        email,
        password,
      });

      alert(
        "Registro exitoso. Ahora inicia sesión"
      );

      navigate("/login");

    } catch (err) {
      const msg =
        err?.response?.data?.message ||
        err?.response?.data?.mensaje ||
        err?.message ||
        "Error al registrar usuario";

      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="registro-container">
      <div className="registro-card">

        <h2 className="registro-title">
          Registro
        </h2>

        <form
          onSubmit={handleSubmit}
          className="registro-form"
        >

          <div className="form-group">
            <label>
              <i className="fas fa-user"></i>
              Primer nombre
            </label>

            <input
              type="text"
              placeholder="Ingresa tu primer nombre"
              value={nombre}
              onChange={(e) => {
                const valor = e.target.value;

                // Solo letras, tildes y espacios
                if (/^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]*$/.test(valor)) {
                  setNombre(valor);
                }
              }}
              maxLength={30}
              required
            />
          </div>

          <div className="form-group">
            <label>
              <i className="fas fa-envelope"></i>
              Correo
            </label>

            <input
              type="email"
              placeholder="tucorreo@ejemplo.com"
              value={email}
              onChange={(e) =>
                setEmail(e.target.value)
              }
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
                type={
                  showPassword
                    ? "text"
                    : "password"
                }
                placeholder="Ingresa tu contraseña"
                value={password}
                onChange={(e) =>
                  setPassword(e.target.value)
                }
                required
              />

              <button
                type="button"
                className="toggle-password"
                onClick={() =>
                  setShowPassword(!showPassword)
                }
              >
                <i
                  className={
                    showPassword
                      ? "fas fa-eye-slash"
                      : "fas fa-eye"
                  }
                />
              </button>
            </div>
            <div
              className={
                passwordValida
                  ? "password-rules password-valid"
                  : "password-rules password-invalid"
              }
            >
              <div>
                <p>• Mín. 8 caracteres</p>
                <p>• 1 número</p>
                <p>• 1 mayúscula</p>
              </div>

              <div>
                <p>• 1 minúscula</p>
                <p>• Sin espacios</p>
                <p>• Sin usar: ¡ ¿ " º ª · ` ´ ç</p>
              </div>
            </div>
          </div>

          <div className="form-group">
            <label>
              <i className="fas fa-check-circle"></i>
              Confirmar Contraseña
            </label>

            <div className="password-wrapper">
              <input
                type={
                  showConfirmPassword
                    ? "text"
                    : "password"
                }
                placeholder="Confirma tu contraseña"
                value={confirmPassword}
                onChange={(e) =>
                  setConfirmPassword(
                    e.target.value
                  )
                }
                required
              />

              <button
                type="button"
                className="toggle-password"
                onClick={() =>
                  setShowConfirmPassword(
                    !showConfirmPassword
                  )
                }
              >
                <i
                  className={
                    showConfirmPassword
                      ? "fas fa-eye-slash"
                      : "fas fa-eye"
                  }
                />
              </button>
            </div>
          </div>

          {error && (
            <p className="error">
              {error}
            </p>
          )}

          <button
            type="submit"
            className="btn-registrar"
            disabled={loading}
          >
            <i className="fas fa-user-plus"></i>

            {loading
              ? "Creando cuenta..."
              : "Registrarse"}
          </button>

        </form>

        <div className="registro-links">
          <Link
            to="/login"
            className="link-login"
          >
            <i className="fas fa-sign-in-alt"></i>
            ¿Ya tienes una cuenta? Inicia Sesión
          </Link>
        </div>

      </div>
    </section>
  );
}

export default Registro;