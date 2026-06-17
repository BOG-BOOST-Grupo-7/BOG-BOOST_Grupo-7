import "./css/Negocios.css"

import prod1 from "../assets/prod15.png"
import prod2 from "../assets/prod2.png"
import prod3 from "../assets/prod12.png"

import instagram from "../assets/instagram.png"
import facebook from "../assets/facebook.png"
import twitter from "../assets/twitter.png"
import flecha from "../assets/flechaD.png"

const negocios = [
  { id: 1, img: prod1 },
  { id: 2, img: prod2 },
  { id: 3, img: prod3 },
]

function Negocios() {
  return (
    <main className="negocios">

      <h1>Negocios</h1>

      <section className="negocios-container">

        {negocios.map((item) => (
          <div key={item.id} className="item-carrito">

            {/* imagen */}
            <div className="item-img">
              <img src={item.img} alt="producto" />
            </div>

            {/* info */}
            <div className="info-negocio">

              <div className="datos">
                <p>Nombre:</p>
                <p>Cantidad:</p>
                <p>$ Valor:</p>
              </div>

              <div className="extra">
                <p>Información:</p>
              </div>

              <div className="acciones">

                {/* redes */}
                <div className="redes">
                  <a href="https://www.instagram.com/" target="_blank">
                    <img src={instagram} alt="instagram" />
                  </a>

                  <a href="https://www.facebook.com/" target="_blank">
                    <img src={facebook} alt="facebook" />
                  </a>

                  <a href="https://x.com/" target="_blank">
                    <img src={twitter} alt="twitter" />
                  </a>
                </div>

                {/* botón */}
                <button className="btn">Ver más</button>

              </div>

            </div>
          </div>
        ))}


      </section>

    </main>
  )
}

export default Negocios