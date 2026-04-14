import "./css/Crud.css"
import { useEffect, useMemo, useState } from "react"
import { usuariosApi } from "../api/usuariosApi"

const emptyForm = { nombre: "", email: "", password: "" }

function UsuariosCrud() {
  const [items, setItems] = useState([])
  const [loadingList, setLoadingList] = useState(false)

  const [form, setForm] = useState(emptyForm)
  const [saving, setSaving] = useState(false)

  const [editingId, setEditingId] = useState(null)
  const isEditing = useMemo(() => editingId !== null, [editingId])

  const [searchId, setSearchId] = useState("")
  const [searchResult, setSearchResult] = useState(null)
  const [searchLoading, setSearchLoading] = useState(false)

  const [error, setError] = useState("")
  const [showPassword, setShowPassword] = useState(false)

  const loadList = async () => {
    setError("")
    setLoadingList(true)
    try {
      const res = await usuariosApi.list()
      setItems(res.data)
    } catch (err) {
      setError(err?.message || "Error listando")
    } finally {
      setLoadingList(false)
    }
  }

  useEffect(() => {
    loadList()
  }, [])

  const onChange = (e) => {
    const { name, value } = e.target
    setForm((f) => ({ ...f, [name]: value }))
  }

  const startCreate = () => {
    setEditingId(null)
    setForm(emptyForm)
    setError("")
  }

  const startEdit = (item) => {
    setEditingId(item.id)
    setForm({
      nombre: item.nombre ?? "",
      email: item.email ?? "",
      password: "",
    })
    setError("")
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  const submit = async (e) => {
    e.preventDefault()
    setError("")

    if (
      !form.nombre.trim() ||
      !form.email.trim() ||
      (!isEditing && !form.password.trim())
    ) {
      setError("Nombre, email y contraseña son obligatorios")
      return
    }

    setSaving(true)
    try {
      if (isEditing) {
        await usuariosApi.update(editingId, {
          nombre: form.nombre,
          email: form.email,
          ...(form.password ? { password: form.password } : {}),
        })
      } else {
        await usuariosApi.create(form)
      }

      startCreate()
      await loadList()
    } catch (err) {
      setError(err?.message || "Error guardando")
    } finally {
      setSaving(false)
    }
  }

  const remove = async (id) => {
    const ok = window.confirm(`¿Eliminar usuario con id=${id}?`)
    if (!ok) return

    try {
      await usuariosApi.remove(id)
      if (editingId === id) startCreate()
      await loadList()
    } catch (err) {
      setError(err?.message || "Error eliminando")
    }
  }

  const searchById = async () => {
    setError("")
    setSearchResult(null)

    if (!searchId.trim()) {
      setError("Escribe un ID")
      return
    }

    setSearchLoading(true)
    try {
      const res = await usuariosApi.getById(searchId)
      setSearchResult(res.data)
    } catch (err) {
      setError("No encontrado")
    } finally {
      setSearchLoading(false)
    }
  }

  return (
    <div className="crud-container">
      <h2>CRUD - Usuarios</h2>

      {error && <div className="crud-error">{error}</div>}

      {/* form */}
      <div className="crud-form-box">
        <h3>{isEditing ? `Editar (id=${editingId})` : "Crear usuario"}</h3>

        <form onSubmit={submit} className="crud-form usuarios-form">
          <input
            name="nombre"
            value={form.nombre}
            onChange={onChange}
            placeholder="Nombre"
          />

          <input
            name="email"
            value={form.email}
            onChange={onChange}
            placeholder="Correo"
          />

          <div className="password-box">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              value={form.password}
              onChange={onChange}
              placeholder="Contraseña"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? "Ocultar" : "Ver"}
            </button>
          </div>

          <button disabled={saving}>
            {saving ? "Guardando..." : isEditing ? "Actualizar" : "Crear"}
          </button>
        </form>
      </div>

      {/* buscador */}
      <div className="crud-search">
        <input
          value={searchId}
          onChange={(e) => setSearchId(e.target.value)}
          placeholder="Buscar por ID"
        />
        <button onClick={searchById} disabled={searchLoading}>
          Buscar
        </button>
      </div>

      {/* resultado */}
      {searchResult && (
        <div className="crud-result">
          <p><strong>ID:</strong> {searchResult.id}</p>
          <p><strong>Nombre:</strong> {searchResult.nombre}</p>
          <p><strong>Email:</strong> {searchResult.email}</p>
        </div>
      )}

      {/* tabla */}
      <table className="crud-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Email</th>
            <th>Acciones</th>
          </tr>
        </thead>

        <tbody>
          {items.map((it) => (
            <tr key={it.id}>
              <td>{it.id}</td>
              <td>{it.nombre}</td>
              <td>{it.email}</td>
              <td>
                <button onClick={() => startEdit(it)}>Editar</button>
                <button onClick={() => remove(it.id)}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default UsuariosCrud