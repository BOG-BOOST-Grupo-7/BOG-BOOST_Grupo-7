import { useState, useEffect } from "react";
import ProductCard from "./ProductCard";

function HomeCarousel({ title, productos = [] }) {
    const [pagina, setPagina] = useState(0);

    const itemsPorFila = 4; // Elementos visibles horizontalmente por página en cada fila
    const maxProductosPorFila = 10; // Máximo de productos permitidos por fila

    // Limitamos los productos totales a un máximo de 30 (10 por cada una de las 3 filas)
    const productosLimitados = productos.slice(0, maxProductosPorFila * 3);

    // Dividimos los productos en 3 filas, asegurando máximo 10 productos por fila
    const fila1 = productosLimitados.slice(0, maxProductosPorFila);
    const fila2 = productosLimitados.slice(maxProductosPorFila, maxProductosPorFila * 2);
    const fila3 = productosLimitados.slice(maxProductosPorFila * 2, maxProductosPorFila * 3);

    const filas = [fila1, fila2, fila3].filter(fila => fila.length > 0);

    // Calculamos el total de páginas basándonos en la fila más larga
    const totalPaginas = Math.max(
        1,
        ...filas.map(fila => Math.ceil(fila.length / itemsPorFila))
    );

    useEffect(() => {
        setPagina(0);
    }, [productos]);

    const siguiente = () => {
        if (pagina >= totalPaginas - 1) {
            setPagina(0);
        } else {
            setPagina(pagina + 1);
        }
    };

    const anterior = () => {
        if (pagina <= 0) {
            setPagina(totalPaginas - 1);
        } else {
            setPagina(pagina - 1);
        }
    };

    const inicio = pagina * itemsPorFila;

    return (
        <div className="carrusel-container">
            <div className="carrusel-header">
                <h2 className="carrusel-title">{title}</h2>
                <div className="carrusel-indicadores">
                    {Array.from({ length: totalPaginas }).map((_, idx) => (
                        <span 
                            key={idx} 
                            className={`indicador-punto ${pagina === idx ? 'activo' : ''}`}
                            onClick={() => setPagina(idx)}
                        />
                    ))}
                </div>
            </div>

            <div className="carrusel-wrapper">
                <button className="carrusel-btn prev" onClick={anterior} aria-label="Anterior">
                    ❮
                </button>

                <div className="carrusel-columnas-container">
                    {filas.length === 0 ? (
                        <p className="sin-productos">No hay productos disponibles en este momento.</p>
                    ) : (
                        filas.map((filaProductos, indexFila) => {
                            const productosVisiblesFila = filaProductos.slice(inicio, inicio + itemsPorFila);
                            if (productosVisiblesFila.length === 0) return null;

                            return (
                                <div key={indexFila} className="carrusel-track">
                                    {productosVisiblesFila.map((producto) => (
                                        <ProductCard
                                            key={producto.id_producto}
                                            producto={producto}
                                        />
                                    ))}
                                </div>
                            );
                        })
                    )}
                </div>

                <button className="carrusel-btn next" onClick={siguiente} aria-label="Siguiente">
                    ❯
                </button>
            </div>
        </div>
    );
}

export default HomeCarousel;