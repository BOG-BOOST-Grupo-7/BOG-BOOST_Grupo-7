import "./css/Productos.css" 
import emp1 from "../assets/emp1.png"
import emp2 from "../assets/emp2.png"
import emp3 from "../assets/emp3.png"
import emp4 from "../assets/emp4.png"
import flechaD from "../assets/flechaD.png"

const emprendimientos = [
  { id: 1, imagen: emp1, nombre: "Info. Emprendimiento" },
  { id: 2, imagen: emp2, nombre: "Info. Emprendimiento" },
  { id: 3, imagen: emp3, nombre: "Info. Emprendimiento" },
  { id: 4, imagen: emp4, nombre: "Info. Emprendimiento" }
]

function Emprendimientos() {
  return (
    <section className="section">
      
      <h2 className="title">Emprendimientos</h2>

      <div className="container">
        
        <div className="row">
          
          <div className="grid">
            {emprendimientos.map((item) => (
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

export default Emprendimientos