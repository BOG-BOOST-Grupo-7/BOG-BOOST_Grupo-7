// Este archivo es para crear los modal con la infromacion de cada puesto 

import React, { useEffect, useState } from 'react';
import { getDatosPuesto } from '../../api/mapaApis';

const ModalInfoPuesto = ({ abierto, alCerrar, numeroPuesto }) => {
  const [datos, setDatos] = useState(null);
  const [cargando, setCargando] = useState(false);

  useEffect(() => {
    if (abierto && numeroPuesto) {
      setCargando(true);
      setDatos(null);
      getDatosPuesto(numeroPuesto)
        .then((data) => setDatos(data))
        .catch(() => setDatos({ error: true }))
        .finally(() => setCargando(false));
    }
  }, [abierto, numeroPuesto]);

  if (!abierto) return null;

  return (
    <div className="modal-fondo" onClick={alCerrar}>
      <div className="modal-contenido" onClick={(e) => e.stopPropagation()}>
        <h3>📦 Puesto N° {numeroPuesto}</h3>

        {cargando ? (
          <p>Cargando información...</p>
        ) : datos?.sin_datos || (!datos?.nombre_negocio && !datos?.propietario) ? (
          <div className="puesto-disponible">
            <p>✅ <strong>Puesto Disponible</strong></p>
            <p>No hay información registrada para este puesto.</p>
          </div>
        ) : datos?.error ? (
          <p>❌ Error al cargar los datos.</p>
        ) : (
          <div className="datos-puesto">
            <p><strong>🏪 Negocio:</strong> {datos.nombre_negocio || 'Sin nombre'}</p>
            <p><strong>👤 Propietario:</strong> {datos.propietario || 'No registrado'}</p>
            <p><strong>🛒 Vende:</strong> {datos.descripcion || 'Sin descripción'}</p>
          </div>
        )}

        <button className="btn-cerrar" onClick={alCerrar}>Cerrar</button>
      </div>
    </div>
  );
};

export default ModalInfoPuesto;