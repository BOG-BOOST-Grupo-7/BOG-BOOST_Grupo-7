import { useState, useEffect, useCallback } from 'react';
import { supabase } from '../supabase';
import MapaSVG from '../components/mapa/MapaSVG';
import ModalInfoPuesto from '../components/mapa/ModalInfoPuesto';
import './MapaMercadoPagina.css';

const MapaMercadoPagina = () => {
  const [escala, setEscala] = useState(1);
  const [puestos, setPuestos] = useState([]);
  const [negocios, setNegocios] = useState([]);
  const [puestoSeleccionado, setPuestoSeleccionado] = useState(null);
  const [cargando, setCargando] = useState(true);

  // 1. Cargar puestos
  const cargarPuestos = useCallback(async () => {
    const { data, error } = await supabase
      .from('puestos')
      .select('*')
      .order('id', { ascending: true });
    
    if (error) {
      console.error('Error puestos:', error);
    } else {
      console.log('Puestos cargados:', data);
      setPuestos(data || []);
    }
  }, []);

  // 2. Cargar negocios aprobados desde el esquema 'negocio'
  const cargarNegocios = useCallback(async () => {
    const { data, error } = await supabase
      .schema('negocio')
      .from('negocio')
      .select('*, puesto(numero_puesto)')
      .eq('estado_negocio', 'APROBADO');

    if (error) {
      console.error('Error negocios:', error);
    } else {
      console.log('Negocios APROBADOS cargados:', data);
      setNegocios(data || []);
    }
  }, []);

  useEffect(() => {
    const cargarTodo = async () => {
      setCargando(true);
      await Promise.all([cargarPuestos(), cargarNegocios()]);
      setCargando(false);
    };
    cargarTodo();
  }, [cargarPuestos, cargarNegocios]);

  // 3. Canal en tiempo real sincronizado con el esquema 'negocio'
  useEffect(() => {
    const canal = supabase
      .channel('cambios-mapa-negocios')
      .on(
        'postgres_changes',
        { event: '*', schema: 'negocio', table: 'negocio' },
        () => cargarNegocios()
      )
      .on(
        'postgres_changes',
        { event: '*', schema: 'negocio', table: 'puesto' },
        () => cargarNegocios()
      )
      .subscribe();

    return () => supabase.removeChannel(canal);
  }, [cargarNegocios]);

  // 4. Enlazar el puesto del mapa con el negocio aprobado de forma más robusta
  const obtenerNegocio = (numeroPuesto) => {
    return negocios.find((n) => {
      if (!n.puesto) return false;

      // Si Supabase devuelve la relación como arreglo
      if (Array.isArray(n.puesto)) {
        return n.puesto.some(
          (p) => String(p.numero_puesto).trim() === String(numeroPuesto).trim()
        );
      }

      // Si Supabase devuelve la relación como un objeto directo
      if (typeof n.puesto === 'object' && n.puesto !== null) {
        return String(n.puesto.numero_puesto).trim() === String(numeroPuesto).trim();
      }

      return false;
    });
  };

  const manejarClicPuesto = (puesto) => {
    // Nota: Asegúrate de si la propiedad en tu tabla de puestos se llama 'numero' o 'numero_puesto'
    const numPuesto = puesto.numero || puesto.numero_puesto;
    const negocio = obtenerNegocio(numPuesto);
    setPuestoSeleccionado({ ...puesto, negocio });
  };

  const cerrarModal = () => setPuestoSeleccionado(null);

  const acercar = () => setEscala((p) => Math.min(p + 0.15, 3));
  const alejar = () => setEscala((p) => Math.max(p - 0.15, 0.5));
  const restablecer = () => setEscala(1);

  if (cargando) return <div className="mapa-cargando">Cargando mapa...</div>;

  return (
    <div className="mapa-pagina">
      <h1>Mapa — Mercado de Pulgas San Alejo</h1>

      <div className="mapa-controles">
        <button onClick={acercar} title="Acercar">➕</button>
        <button onClick={alejar} title="Alejar">➖</button>
        <button onClick={restablecer} title="Restablecer">↺</button>
        <span className="zoom-indicador">{Math.round(escala * 100)}%</span>
      </div>

      <div className="mapa-viewport">
        <div
          className="mapa-contenido"
          style={{
            transform: `scale(${escala})`,
            transformOrigin: 'top center',
          }}
        >
          <MapaSVG
            puestos={puestos}
            obtenerNegocio={obtenerNegocio}
            alHacerClicPuesto={manejarClicPuesto}
          />
        </div>
      </div>

      <ModalInfoPuesto
        puesto={puestoSeleccionado}
        negocio={puestoSeleccionado?.negocio}
        alCerrar={cerrarModal}
      />
    </div>
  );
};

export default MapaMercadoPagina;