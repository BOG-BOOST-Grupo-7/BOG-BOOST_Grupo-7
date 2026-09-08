import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import ProductCard from "./ProductCard"; 
import { buscarProductosYNegociosApi } from "../../api/buscadorApi";
import "../../styles/ResultadosBusqueda.css"; 
function ResultadosBusqueda() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q") || "";
  const navigate = useNavigate();

  const [productos, setProductos] = useState([]);
  const [negocios, setNegocios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filtroActivo, setFiltroActivo] = useState("todo"); // 'todo' | 'productos' | 'negocios'

  useEffect(() => {
    if (query) {
      cargarResultados(query);
    }
  }, [query]);

  const cargarResultados = async (termino) => {
    setLoading(true);
    try {
      const data = await buscarProductosYNegociosApi(termino);
      setProductos(data.productos || []);
      setNegocios(data.negocios || []);
    } catch (error) {
      console.error("Error al cargar los resultados de búsqueda:", error);
    } finally {
      setLoading(false);
    }
  };

  const totalResultados = productos.length + negocios.length;

  return (
    <div className="busqueda-page">
      {/* CABECERA DE BÚSQUEDA */}
      <div className="busqueda-header">
        <h1>Resultados para: <span className="query-highlight">"{query}"</span></h1>
        <p className="busqueda-counter">
          {loading ? "Buscando coincidencias..." : `Se encontraron ${totalResultados} resultados en total`}
        </p>

        {/* PESTAÑAS DE FILTRO */}
        {!loading && totalResultados > 0 && (
          <div className="busqueda-tabs">
            <button 
              className={`tab-btn ${filtroActivo === "todo" ? "active" : ""}`}
              onClick={() => setFiltroActivo("todo")}
            >
              Todos ({totalResultados})
            </button>
            <button 
              className={`tab-btn ${filtroActivo === "productos" ? "active" : ""}`}
              onClick={() => setFiltroActivo("productos")}
            >
              Productos ({productos.length})
            </button>
            <button 
              className={`tab-btn ${filtroActivo === "negocios" ? "active" : ""}`}
              onClick={() => setFiltroActivo("negocios")}
            >
              Negocios ({negocios.length})
            </button>
          </div>
        )}
      </div>

      {loading ? (
        <div className="busqueda-loading">
          <div className="spinner"></div>
          <p>Explorando el catálogo y negocios...</p>
        </div>
      ) : totalResultados === 0 ? (
        <div className="busqueda-empty">
          <i className="fas fa-search fa-3x"></i>
          <h3>No encontramos lo que buscabas</h3>
          <p>Intenta con otra palabra clave o revisa la ortografía.</p>
        </div>
      ) : (
        <div className="busqueda-content">
          
          {/* SECCIÓN DE PRODUCTOS */}
          {(filtroActivo === "todo" || filtroActivo === "productos") && productos.length > 0 && (
            <section className="seccion-resultados">
              <div className="seccion-titulo-wrapper">
                <h2>Productos</h2>
                <span className="badge-count">{productos.length}</span>
              </div>
              <div className="grid-productos-pro">
                {productos.map((prod) => (
                  <ProductCard key={prod.id_producto} producto={prod} />
                ))}
              </div>
            </section>
          )}

          {/* SECCIÓN DE NEGOCIOS */}
          {(filtroActivo === "todo" || filtroActivo === "negocios") && negocios.length > 0 && (
            <section className="seccion-resultados">
              <div className="seccion-titulo-wrapper">
                <h2>Negocios Aliados</h2>
                <span className="badge-count">{negocios.length}</span>
              </div>
              <div className="grid-negocios-pro">
                {negocios.map((negocio) => (
                  <div
                    key={negocio.id_negocio}
                    className="negocio-card-pro"
                    onClick={() => navigate(`/negocios/${negocio.id_negocio}`)}
                  >
                    <div className="negocio-logo-container">
                      <img
                        src={negocio.logo || "https://via.placeholder.com/150"}
                        alt={negocio.nombre_negocio}
                      />
                    </div>
                    <div className="negocio-info">
                      <h3>{negocio.nombre_negocio}</h3>
                      <p>{negocio.descripcion_negocio}</p>
                      <span className="visitar-link">Visitar tienda <i className="fas fa-arrow-right"></i></span>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

        </div>
      )}
    </div>
  );
}

export default ResultadosBusqueda;