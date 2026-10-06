import { useNavigate } from 'react-router-dom';
import './ModalInfoPuesto.css';

const ModalInfoPuesto = ({ puesto, negocio, alCerrar }) => {
  const navigate = useNavigate();

  if (!puesto) return null;
  const estaOcupado = Boolean(negocio);

  // Función para manejar el clic y redirigir al perfil del negocio
  const irAlDetalleNegocio = () => {
    if (negocio && negocio.id_negocio) {
      alCerrar(); // Cerramos el modal primero
      navigate(`/negocios/${negocio.id_negocio}`); // Redirige a la ruta configurada
    }
  };

  return (
    <div className="modal-fondo" onClick={alCerrar}>
      <div className="modal-contenido" onClick={(e) => e.stopPropagation()}>
        <button className="boton-cerrar" onClick={alCerrar}>×</button>

        <h2>Puesto N° {puesto.numero}</h2>

        {estaOcupado ? (
          <div 
            className="info-negocio clicable" 
            onClick={irAlDetalleNegocio}
            title="Haz clic para ver el perfil del negocio"
          >
            {/* Logo del negocio si lo tiene registrado */}
            {negocio.logo && (
              <div className="modal-logo-container">
                <img 
                  src={negocio.logo} 
                  alt={negocio.nombre_negocio} 
                />
              </div>
            )}

            <div className="insignia ocupado">Ocupado</div>
            
            <div className="campo-info">
              <span className="etiqueta">Nombre del negocio:</span>
              <span className="valor">{negocio.nombre_negocio || 'Sin nombre'}</span>
            </div>
            
            <div className="campo-info">
              <span className="etiqueta">Descripción:</span>
              <span className="valor">{negocio.descripcion_negocio || 'Sin descripción'}</span>
            </div>

            <div className="campo-info">
              <span className="etiqueta">Teléfono de contacto:</span>
              <span className="valor">{negocio.telefono_negocio || 'No especificado'}</span>
            </div>

            <span className="texto-ver-perfil">Ver perfil completo ➜</span>
          </div>
        ) : (
          <div className="info-disponible">
            <div className="insignia disponible">Disponible</div>
            <p>
              Este puesto se encuentra libre. Se mostrará ocupado cuando el
              administrador apruebe un negocio registrado para este número.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ModalInfoPuesto;