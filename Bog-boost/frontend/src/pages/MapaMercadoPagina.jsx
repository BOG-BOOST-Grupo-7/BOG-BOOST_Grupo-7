import { useState, useEffect } from 'react';
import { supabase } from '../supabase';
import Puesto from '../components/mapa/Puesto';
import ModalInfoPuesto from '../components/mapa/ModalInfoPuesto';
import './MapaMercadoPagina.css';

const MapaMercadoPagina = () => {
  const [escala, setEscala] = useState(1);
  const [puestos, setPuestos] = useState([]);
  const [negocios, setNegocios] = useState([]);
  const [puestoSeleccionado, setPuestoSeleccionado] = useState(null);
  const [negocioSeleccionado, setNegocioSeleccionado] = useState(null);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    const cargarTodo = async () => {
      setCargando(true);

      // Cargar puestos
      const { data: listaPuestos, error: errorPuestos } = await supabase
        .from('puestos')
        .select('*');

      if (errorPuestos) {
        console.error('Error puestos:', errorPuestos);
      } else {
        setPuestos(listaPuestos || []);
      }

      // Cargar negocios aceptados
      const { data: listaNegocios, error: errorNegocios } = await supabase
        .from('negocios')
        .select('*')
        .eq('estado', 'aceptado');

      if (errorNegocios) {
        console.error('Error negocios:', errorNegocios);
      } else {
        setNegocios(listaNegocios || []);
      }

      setCargando(false);
    };

    cargarTodo();

    // Tiempo real
    const canal = supabase
      .channel('cambios-mapa')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'negocios' },
        cargarTodo
      )
      .subscribe();

    return () => supabase.removeChannel(canal);
  }, []);

  const manejarClic = (puesto) => {
    const negocio = negocios.find(
      n => String(n.numero_puesto) === String(puesto.numero)
    );
    setPuestoSeleccionado(puesto);
    setNegocioSeleccionado(negocio);
  };

  const cerrarModal = () => {
    setPuestoSeleccionado(null);
    setNegocioSeleccionado(null);
  };

  if (cargando) return <div className="mapa-cargando">Cargando mapa...</div>;

  return (
    <div className="mapa-pagina">
      <h1>Mapa — Mercado de Pulgas San Alejo</h1>
      
      <div className="mapa-controles">
        <button onClick={() => setEscala(p => Math.min(p + 0.2, 2.5))}>➕</button>
        <button onClick={() => setEscala(p => Math.max(p - 0.2, 0.6))}>➖</button>
        <button onClick={() => setEscala(1)}>↺ Restablecer</button>
      </div>

      <div className="mapa-viewport">
        <div className="mapa-contenido" style={{ transform: `scale(${escala})`, transformOrigin: 'top left' }}>
          {/* Referencias */}
          <div className="referencia monserrate">MONSERRATE</div>
          <div className="referencia museo">MUSEO DE ARTE MODERNO</div>
          <div className="referencia planetario">PLANETARIO DISTRITAL</div>
          <div className="referencia colpatria">TORRE COLPATRIA</div>
          
          <div className="etiqueta-entrada derecha">ENTRADA Calle 24 ←</div>
          <div className="etiqueta-entrada abajo">↑ ENTRADA Cra 7</div>
          <div className="zona-aseo">ASEO</div>

          {/* Puestos */}
          {puestos.map(puesto => {
            const negocio = negocios.find(
              n => String(n.numero_puesto) === String(puesto.numero)
            );
            return (
              <Puesto
                key={puesto.id}
                datos={puesto}
                negocio={negocio}
                alHacerClic={manejarClic}
              />
            );
          })}
        </div>
      </div>

      <ModalInfoPuesto
        puesto={puestoSeleccionado}
        negocio={negocioSeleccionado}
        alCerrar={cerrarModal}
      />
    </div>
  );
};

export default MapaMercadoPagina;