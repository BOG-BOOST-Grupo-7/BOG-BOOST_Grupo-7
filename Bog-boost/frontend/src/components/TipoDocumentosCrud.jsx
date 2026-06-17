import "./css/Crud.css"
import { useEffect, useMemo, useState } from "react"
import { tipoDocumentosApi } from "../api/tipoDocumentosApi"

const emptyForm = { sigla: "", nombre_documento: "" }

function TipoDocumentosCrud() {
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
      const res = await tipoDocumentosApi.list()
      setItems(res.data)
    } catch (err) {
      setError(err?.response?.statusText || err?.message || "Error listando")
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
      sigla: item.sigla ?? "",
      nombre_documento: item.nombre_documento ?? "",
    })
    setError("")
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  const submit = async (e) => {
    e.preventDefault()
    setError("")

    if (!form.sigla.trim() || !form.nombre_documento.trim()) {
      setError("Sigla y nombre son obligatorios")
      return
    }

    setSaving(true)
    try {
      if (isEditing) {
        await tipoDocumentosApi.update(editingId, form)
      } else {
        await tipoDocumentosApi.create(form)
      }

      startCreate()
      await loadList()
    } catch (err) {
      const msg =
        err?.response?.data?.message ||
        err?.response?.statusText ||
        err?.message ||
        "Error guardando"
      setError(msg)
    } finally {
      setSaving(false)
    }
  }

  const remove = async (id) => {
    const ok = window.confirm(`¿Eliminar tipo documento con id=${id}?`)
    if (!ok) return

    try {
      await tipoDocumentosApi.remove(id)
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
      const res = await tipoDocumentosApi.getById(searchId)
      setSearchResult(res.data)
    } catch (err) {
      setError("No encontrado")
    } finally {
      setSearchLoading(false)
    }
  }

  return (
    <div className="crud-container">
      <h2>CRUD - Tipos de Documento</h2>

      {error && <div className="crud-error">{error}</div>}

      {/* form */}
      <div className="crud-form-box">
        <h3>{isEditing ? `Editar (id=${editingId})` : "Crear tipo documento"}</h3>

        <form onSubmit={submit} className="crud-form tipodoc-form">
          <input
            name="sigla"
            value={form.sigla}
            onChange={onChange}
            placeholder="Sigla"
          />

          <input
            name="nombre_documento"
            value={form.nombre_documento}
            onChange={onChange}
            placeholder="Nombre documento"
          />

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
          <p><strong>Sigla:</strong> {searchResult.sigla}</p>
          <p><strong>Nombre:</strong> {searchResult.nombre_documento}</p>
        </div>
      )}

      {/* tabla */}
      <table className="crud-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Sigla</th>
            <th>Nombre</th>
            <th>Acciones</th>
          </tr>
        </thead>

        <tbody>
          {items.map((it) => (
            <tr key={it.id}>
              <td>{it.id}</td>
              <td>{it.sigla}</td>
              <td>{it.nombre_documento}</td>
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

export default TipoDocumentosCrud