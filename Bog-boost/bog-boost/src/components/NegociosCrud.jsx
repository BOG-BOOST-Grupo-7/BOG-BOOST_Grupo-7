import "./css/Crud.css"
import { useEffect, useMemo, useState } from "react"
import { negociosApi } from "../api/negociosApi"

const emptyForm = {
  nombre: "",
  descripcion: "",
  telefono: "",
  logo: "",
  estado: "",
}

function NegociosCrud() {
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

  const loadList = async () => {
    setError("")
    setLoadingList(true)
    try {
      const res = await negociosApi.list()
      setItems(res.data)
    } catch (err) {
      setError(err?.response?.statusText || err?.message)
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
      nombre: item.nombre || "",
      descripcion: item.descripcion || "",
      telefono: item.telefono || "",
      logo: item.logo || "",
      estado: item.estado || "",
    })
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  const submit = async (e) => {
    e.preventDefault()
    setError("")

    if (!form.nombre.trim() || !form.telefono.trim()) {
      setError("Nombre y teléfono son obligatorios")
      return
    }

    setSaving(true)
    try {
      if (isEditing) {
        await negociosApi.update(editingId, form)
      } else {
        await negociosApi.create(form)
      }

      startCreate()
      await loadList()
    } catch (err) {
      setError(err?.response?.data?.message || err?.message)
    } finally {
      setSaving(false)
    }
  }

  const remove = async (id) => {
    if (!window.confirm("¿Eliminar negocio?")) return

    try {
      await negociosApi.remove(id)
      await loadList()
    } catch (err) {
      setError(err?.response?.data?.message || err?.message)
    }
  }

  const searchById = async () => {
    setError("")
    setSearchResult(null)

    if (!searchId.trim()) {
      setError("Ingresa un ID")
      return
    }

    setSearchLoading(true)
    try {
      const res = await negociosApi.getById(searchId)
      setSearchResult(res.data)
    } catch {
      setError("No encontrado")
    } finally {
      setSearchLoading(false)
    }
  }

  return (
    <div className="crud-container">
      <h2>CRUD - Negocios</h2>

      {error && <div className="crud-error">{error}</div>}

      {}
      <div className="crud-form-box">
        <h3>{isEditing ? `Editar (id=${editingId})` : "Crear negocio"}</h3>

        <form onSubmit={submit} className="crud-form negocios-form">
          <input name="nombre" value={form.nombre} onChange={onChange} placeholder="Nombre" />
          <input name="descripcion" value={form.descripcion} onChange={onChange} placeholder="Descripción" />
          <input name="telefono" value={form.telefono} onChange={onChange} placeholder="Teléfono" />
          <input name="logo" value={form.logo} onChange={onChange} placeholder="Logo URL" />
          <input name="estado" value={form.estado} onChange={onChange} placeholder="Estado" />

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
          <p><strong>Teléfono:</strong> {searchResult.telefono}</p>
          <p><strong>Estado:</strong> {searchResult.estado}</p>
        </div>
      )}

      {/* tabla */}
      <table className="crud-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Teléfono</th>
            <th>Estado</th>
            <th>Acciones</th>
          </tr>
        </thead>

        <tbody>
          {items.map((it) => (
            <tr key={it.id}>
              <td>{it.id}</td>
              <td>{it.nombre}</td>
              <td>{it.telefono}</td>
              <td>{it.estado}</td>
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

export default NegociosCrud