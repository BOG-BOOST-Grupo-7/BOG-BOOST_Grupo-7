import "./css/Carrusel.css"
import { useState } from "react"

import img1 from "../assets/img1.png"
import img2 from "../assets/img2.png"
import img3 from "../assets/img3.png"
import flechaI from "../assets/flechaI.png"
import flechaD from "../assets/flechaD.png"

const images = [img1, img2, img3]

function Carrusel() {
  const [index, setIndex] = useState(0)

  const prev = () => {
    setIndex((index - 1 + images.length) % images.length)
  }

  const next = () => {
    setIndex((index + 1) % images.length)
  }

  return (
    <section className="carrusel-wrapper">
  <div className="carrusel">

    <button className="btn-arrow" onClick={prev}>
      <img src={flechaI} className="arrow" />
    </button>

    <div className="imgBox">
      <img src={images[index]} />
    </div>

    <button className="btn-arrow" onClick={next}>
      <img src={flechaD} className="arrow" />
    </button>

  </div>
</section>
  )
}

export default Carrusel