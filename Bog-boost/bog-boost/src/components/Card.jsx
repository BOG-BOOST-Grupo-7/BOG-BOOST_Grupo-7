import "./css/Card.css"

function Card({ titulo, texto }) {
  return (
    <div className="card-box">
      <h3 className="card-title">{titulo}</h3>
      <p className="card-text">{texto}</p>
    </div>
  )
}

export default Card