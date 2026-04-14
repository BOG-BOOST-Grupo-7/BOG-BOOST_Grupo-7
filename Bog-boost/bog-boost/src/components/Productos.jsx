import "./css/Productos.css"
import pro1 from "../assets/pro1.png"
import pro2 from "../assets/pro2.png"
import pro3 from "../assets/pro3.png"
import pro4 from "../assets/pro4.png"
import flechaD from "../assets/flechaD.png"

const productos = [
  { id: 1, imagen: pro1, nombre: "Info. Producto" },
  { id: 2, imagen: pro2, nombre: "Info. Producto" },
  { id: 3, imagen: pro3, nombre: "Info. Producto" },
  { id: 4, imagen: pro4, nombre: "Info. Producto" }
]

function Productos() {
  return (
    <section className="section">
      
      <h2 className="title">Productos</h2>

      <div className="container">
        
        <div className="row">
          
          <div className="grid">
            {productos.map((item) => (
              <div key={item.id} className="card">
                
                <div className="productos-imgBox">
                  <img src={item.imagen} alt={item.nombre} />
                </div>

                <p className="text">{item.nombre}</p>
              </div>
            ))}
          </div>

          <button className="btn-arrow">
            <img src={flechaD} className="arrow" />
          </button>

        </div>

      </div>
    </section>
  )
}

export default Productos