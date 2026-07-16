import "../../styles/Home.css";

import { useEffect, useState } from "react";

import HomeCarousel from "../../components/home/HomeCarousel";
import HomeMap from "../../components/home/HomeMap";
import RegistrarNegocioCard from "../../components/home/RegistrarNegocioCard";

import { obtenerProductos } from "../../api/productoApi";

function Home() {

  const [productos, setProductos] = useState([]);

  useEffect(() => {
    cargarProductos();
  }, []);

  const cargarProductos = async () => {

    try {

      const data = await obtenerProductos();

      setProductos(data);

    } catch (error) {

      console.error(error);

    }

  };

  const productosDestacados = productos;

  const artesanias = productos.filter(
    producto =>
      producto.categoria?.nombre_categoria === "Artesanías"
  );

  const ofertasEspeciales = productos.filter(
    producto => Number(producto.precio) < 30000
  );

  console.log("Productos:", productos);
  console.log("Cantidad:", productos.length);
  console.log("Productos destacados:", productosDestacados);

  return (

    <div className="container-home">

      <h1 className="view-title">
        Inicio
      </h1>

      <div className="main-content">

        <div className="carruseles-column">

          <HomeCarousel
            title="Productos Destacados"
            productos={productosDestacados}
          />

          <HomeCarousel
            title="Ofertas Especiales"
            productos={ofertasEspeciales}
          />

          <HomeCarousel
            title="Artesanías"
            productos={artesanias}
          />

        </div>

        <div className="right-column">

          <HomeMap />

          <RegistrarNegocioCard />

        </div>

      </div>

    </div>

  );

}

export default Home;