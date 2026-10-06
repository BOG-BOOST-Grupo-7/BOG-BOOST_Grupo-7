import { useState, useEffect } from "react";
import ProductCard from "./ProductCard";

function HomeCarousel({ title, productos = [] }) {
    const itemsPorFila = 4; // Elementos visibles horizontalmente por página en cada fila
    const maxProductosPorFila = 12; // Máximo de productos permitidos por fila

    // Limitamos los productos totales a un máximo de 30 (10 por cada una de las 3 filas)
    const productosLimitados = productos.slice(0, maxProductosPorFila * 3);

    // Dividimos los productos en 3 filas, asegurando máximo 10 productos por fila
    const fila1 = productosLimitados.slice(0, maxProductosPorFila);
    const fila2 = productosLimitados.slice(maxProductosPorFila, maxProductosPorFila * 2);
    const fila3 = productosLimitados.slice(maxProductosPorFila * 2, maxProductosPorFila * 3);

    const filas = [fila1, fila2, fila3].filter(fila => fila.length > 0);

    // Estado para llevar el control de la página actual de CADA fila de manera independiente.
    // Inicializamos un objeto o arreglo de páginas en 0 para cada fila existente.
    const [paginasFilas, setPaginasFilas] = useState({});

    useEffect(() => {
        // Reiniciamos las páginas a 0 cuando cambian los productos globales
        const paginasIniciales = {};
        filas.forEach((_, idx) => {
            paginasIniciales[idx] = 0;
        });
        setPaginasFilas(paginasIniciales);
    }, [productos]);

    const siguienteFila = (indexFila, totalPaginasFila) => {
        const paginaActual = paginasFilas[indexFila] || 0;
        const nuevaPagina = paginaActual >= totalPaginasFila - 1 ? 0 : paginaActual + 1;
        setPaginasFilas(prev => ({ ...prev, [indexFila]: nuevaPagina }));
    };

    const anteriorFila = (indexFila, totalPaginasFila) => {
        const paginaActual = paginasFilas[indexFila] || 0;
        const nuevaPagina = paginaActual <= 0 ? totalPaginasFila - 1 : paginaActual - 1;
        setPaginasFilas(prev => ({ ...prev, [indexFila]: nuevaPagina }));
    };

    const irAPaginaFila = (indexFila, numPagina) => {
        setPaginasFilas(prev => ({ ...prev, [indexFila]: numPagina }));
    };

    return (
        <div className="carrusel-container">
            <div className="carrusel-header">
                <h2 className="carrusel-title">{title}</h2>
                {/* Los indicadores globales superiores se pueden omitir o adaptar ya que cada fila ahora tiene su propia paginación independiente */}
            </div>

            <div className="carrusel-columnas-container">
                {filas.length === 0 ? (
                    <p className="sin-productos">No hay productos disponibles en este momento.</p>
                ) : (
                    filas.map((filaProductos, indexFila) => {
                        const totalPaginasFila = Math.max(1, Math.ceil(filaProductos.length / itemsPorFila));
                        const paginaActual = paginasFilas[indexFila] || 0;
                        const inicio = paginaActual * itemsPorFila;
                        const productosVisiblesFila = filaProductos.slice(inicio, inicio + itemsPorFila);

                        if (filaProductos.length === 0) return null;

                        return (
                            <div key={indexFila} className="fila-carrusel-independiente" style={{ marginBottom: indexFila < filas.length - 1 ? '20px' : '0' }}>
                                
                                {/* Opcional: Indicador o subtítulo por fila si lo deseas */}
                                <div className="carrusel-wrapper">
                                    <button 
                                        className="carrusel-btn prev" 
                                        onClick={() => anteriorFila(indexFila, totalPaginasFila)} 
                                        aria-label="Anterior"
                                    >
                                        ❮
                                    </button>

                                    <div className="carrusel-track">
                                        {productosVisiblesFila.map((producto) => (
                                            <ProductCard
                                                key={producto.id_producto}
                                                producto={producto}
                                            />
                                        ))}
                                    </div>

                                    <button 
                                        className="carrusel-btn next" 
                                        onClick={() => siguienteFila(indexFila, totalPaginasFila)} 
                                        aria-label="Siguiente"
                                    >
                                        ❯
                                    </button>
                                </div>

                                {/* Puntos indicadores específicos para esta fila */}
                                {totalPaginasFila > 1 && (
                                    <div className="carrusel-indicadores" style={{ justifyContent: 'center', marginTop: '8px' }}>
                                        {Array.from({ length: totalPaginasFila }).map((_, idx) => (
                                            <span 
                                                key={idx} 
                                                className={`indicador-punto ${paginaActual === idx ? 'activo' : ''}`}
                                                onClick={() => irAPaginaFila(indexFila, idx)}
                                            />
                                        ))}
                                    </div>
                                )}
                            </div>
                        );
                    })
                )}
            </div>
        </div>
    );
}

export default HomeCarousel;