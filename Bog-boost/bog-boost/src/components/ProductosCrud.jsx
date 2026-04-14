import "./css/Crud.css"
import { useEffect, useMemo, useState } from "react"
import { productosApi } from "../api/productosApi"

const emptyForm = {
  nombre: "",
  descripcion: "",
  stock: "",
  precio: "",
  estado: "",
  imagen: "",
}

function ProductosCrud() {
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

  // LISTAR
  const loadList = async () => {
    setError("")
    setLoadingList(true)
    try {
      const res = await productosApi.list()
      setItems(res.data)
    } catch (err) {
      const msg =
        err?.response?.data?.message ||
        err?.response?.statusText ||
        err?.message ||
        "Error listando productos"

      setError(msg)
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
      descripcion: item.descripcion ?? "",
      stock: item.stock ?? "",
      precio: item.precio ?? "",
      estado: item.estado ?? "",
      imagen: item.imagen ?? "",
    })
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  const submit = async (e) => {
    e.preventDefault()
    setError("")

    if (!form.nombre.trim() || !form.precio || !form.stock) {
      setError("Nombre, precio y stock son obligatorios")
      return
    }

    setSaving(true)
    try {
      if (isEditing) {
        await productosApi.update(editingId, form)
      } else {
        await productosApi.create(form)
      }

      startCreate()
      await loadList()
    } catch (err) {
      const msg =
        err?.response?.data?.message ||
        err?.response?.statusText ||
        err?.message ||
        "Error guardando producto"

      setError(msg)
    } finally {
      setSaving(false)
    }
  }

  const remove = async (id) => {
    const ok = window.confirm(`¿Eliminar producto con id=${id}?`)
    if (!ok) return

    try {
      await productosApi.remove(id)
      await loadList()
    } catch (err) {
      const msg =
        err?.response?.data?.message ||
        err?.response?.statusText ||
        err?.message ||
        "Error eliminando producto"

      setError(msg)
    }
  }

  const searchById = async () => {
    setError("")
    setSearchResult(null)

    const id = searchId.trim()

    if (!id) {
      setError("Escribe un ID para buscar")
      return
    }

    setSearchLoading(true)
    try {
      const res = await productosApi.getById(id)
      setSearchResult(res.data)
    } catch (err) {
      const status = err?.response?.status

      if (status === 404) setError("Producto no encontrado")
      else setError("Error buscando producto")
    } finally {
      setSearchLoading(false)
    }
  }

  return (
    <div className="crud-container">
      <h2>CRUD - Productos</h2>

      {error && <div className="crud-error">{error}</div>}

      {/* form */}
      <div className="crud-form-box">
        <h3>{isEditing ? `Editar (id=${editingId})` : "Crear producto"}</h3>

        <form onSubmit={submit} className="crud-form productos-form">
          <input name="nombre" value={form.nombre} onChange={onChange} placeholder="Nombre" />
          <input name="descripcion" value={form.descripcion} onChange={onChange} placeholder="Descripción" />
          <input name="stock" value={form.stock} onChange={onChange} placeholder="Stock" />
          <input name="precio" value={form.precio} onChange={onChange} placeholder="Precio" />
          <input name="estado" value={form.estado} onChange={onChange} placeholder="Estado" />
          <input name="imagen" value={form.imagen} onChange={onChange} placeholder="URL Imagen" />

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
          {searchLoading ? "Buscando..." : "Buscar"}
        </button>
      </div>

      {/* resultado */}
      {searchResult && (
        <div className="crud-result">
          <p><strong>ID:</strong> {searchResult.id}</p>
          <p><strong>Nombre:</strong> {searchResult.nombre}</p>
          <p><strong>Precio:</strong> {searchResult.precio}</p>
          <p><strong>Stock:</strong> {searchResult.stock}</p>
        </div>
      )}

      {/* tabla */}
      {loadingList ? (
        <p>Cargando productos...</p>
      ) : (
        <table className="crud-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Precio</th>
              <th>Stock</th>
              <th>Estado</th>
              <th>Acciones</th>
            </tr>
          </thead>

          <tbody>
            {items.map((it) => (
              <tr key={it.id}>
                <td>{it.id}</td>
                <td>{it.nombre}</td>
                <td>{it.precio}</td>
                <td>{it.stock}</td>
                <td>{it.estado}</td>
                <td>
                  <button onClick={() => startEdit(it)}>Editar</button>
                  <button onClick={() => remove(it.id)}>Eliminar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  )
}

export default ProductosCrud