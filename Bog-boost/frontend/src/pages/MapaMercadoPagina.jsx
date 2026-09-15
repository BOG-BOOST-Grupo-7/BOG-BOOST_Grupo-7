// Este archivo es para crear la pagina y poner la ruta 
import MapaMercado from "../components/mapa/MapaMercado.jsx"; // ✅ Importa el mapa real

const MapaMercadoPagina = () => {
  return (
    <div>
      <MapaMercado /> {/* ✅ Componente del mapa */}
    </div>
  );
};

export default MapaMercadoPagina;
