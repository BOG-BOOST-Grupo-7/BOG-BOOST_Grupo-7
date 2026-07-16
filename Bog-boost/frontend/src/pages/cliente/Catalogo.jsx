import "./css/Catalogo.css"

import prod1 from "../assets/prod1.png"
import prod2 from "../assets/prod2.png"
import prod3 from "../assets/prod3.png"
import prod4 from "../assets/prod4.png"
import prod5 from "../assets/prod5.png"
import prod6 from "../assets/prod6.png"
import prod7 from "../assets/prod7.png"
import prod8 from "../assets/prod8.png"
import flecha from "../assets/flechaD.png"

const accesorios = [prod1, prod2, prod3, prod4]
const artesanias = [prod5, prod6, prod7, prod8]

function Catalogo() {
  return (
    <main className="catalogo-main">

      <h1 className="catalogo-title">Catálogo de productos</h1>

      <section className="catalogo-section">

        {/* ACCESORIOS */}
        <div className="productos">
          <h2>Categoría: Accesorios</h2>

          <div className="contenedor">
            <div className="row">

              <div className="grid">
                {accesorios.map((img, i) => (
                  <article key={i}>
                    <div className="img-container">
                      <img src={img} alt="producto" />
                    </div>

                    <div className="informacion">
                      <p>Info. producto</p>
                      <button className="btn">Ver detalles</button>
                    </div>
                  </article>
                ))}
              </div>

              <button className="btn-arrow">
                <img src={flecha} className="arrow" />
              </button>

            </div>
          </div>
        </div>

        {/* ARTESANÍAS */}
        <div className="productos">
          <h2>Categoría: Artesanías</h2>

          <div className="contenedor">
            <div className="row">

              <div className="grid">
                {artesanias.map((img, i) => (
                  <article key={i}>
                    <div className="img-container">
                      <img src={img} alt="producto" />
                    </div>

                    <div className="informacion">
                      <p>Info. producto</p>
                      <button className="btn">Ver detalles</button>
                    </div>
                  </article>
                ))}
              </div>

              <button className="btn-arrow">
                <img src={flecha} className="arrow" />
              </button>

            </div>
          </div>
        </div>

      </section>

      {/* carrito */}
      <button className="carrito">🛒</button>

    </main>
  )
}

export default Catalogo