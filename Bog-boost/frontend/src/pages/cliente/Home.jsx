import React from 'react';
import "../../styles/Home.css";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaTruck } from "react-icons/fa"; // <-- Importamos el icono para el aviso
import HomeCarousel from "../../components/home/HomeCarousel";
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
  const ofertasEspeciales = productos.filter(
    producto => Number(producto.precio) < 50000
  );

  return (
    <div className="container-home">
      <h1 className="view-title">Inicio</h1>
      
      {/* ========================================== */}
      {/* AVISO PROFESIONAL DE COBERTURA DE ENVÍOS   */}
      {/* ========================================== */}
      <div className="aviso-cobertura">
        <div className="aviso-icono">
          <FaTruck />
        </div>
        <div className="aviso-texto">
          <h4>Cobertura de Entregas y Envíos</h4>
          <p>
            Actualmente realizamos despachos y entregas locales únicamente en <strong>Bogotá y alrededores</strong>. ¡Apoya el comercio local de nuestra ciudad!
          </p>
        </div>
      </div>

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
        </div>

        <div className="right-column">
          {/* Enlace al mapa */}
          <div className="tarjeta-mapa">
            <h3>Explora el Mercado</h3>
            <p>Ubica los puestos en nuestro mapa interactivo</p>
            <Link to="/mapa-mercado" className="boton-mapa">
              Ver Mapa del Mercado
            </Link>
          </div>

          <RegistrarNegocioCard />
        </div>
      </div>
    </div>
  );
}

export default Home;