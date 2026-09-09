import { readFileSync, writeFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const dbPath = join(__dirname, '../../db.json');

// Leer datos del archivo db.json
const readStands = () => {
  try {
    const data = readFileSync(dbPath, 'utf8');
    const db = JSON.parse(data);
    return db.stands || [];
  } catch (error) {
    console.error('Error al leer puestos:', error);
    return [];
  }
};

// Guardar datos en db.json
const writeStands = (stands) => {
  try {
    const data = readFileSync(dbPath, 'utf8');
    const db = JSON.parse(data);
    db.stands = stands;
    writeFileSync(dbPath, JSON.stringify(db, null, 2));
    return true;
  } catch (error) {
    console.error('Error al guardar puestos:', error);
    return false;
  }
};

// Obtener todos los puestos
export const getAllStands = async (req, res) => {
  try {
    const stands = readStands();
    res.json(stands);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener los puestos' });
  }
};

// Obtener puesto por ID
export const getStandById = async (req, res) => {
  try {
    const { id } = req.params;
    const stands = readStands();
    const stand = stands.find(s => s.id === parseInt(id));
    
    if (!stand) {
      return res.status(404).json({ error: 'Puesto no encontrado' });
    }
    
    res.json(stand);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener el puesto' });
  }
};

// Obtener puestos por sección
export const getStandsBySection = async (req, res) => {
  try {
    const { section } = req.params;
    const stands = readStands();
    const filtered = stands.filter(s => s.section === section);
    res.json(filtered);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener los puestos por sección' });
  }
};

// Buscar puestos
export const searchStands = async (req, res) => {
  try {
    const { q } = req.query;
    if (!q) {
      return res.json([]);
    }

    const stands = readStands();
    const searchTerm = q.toLowerCase();
    const results = stands.filter(s => 
      s.owner?.toLowerCase().includes(searchTerm) ||
      s.products?.some(p => p.toLowerCase().includes(searchTerm)) ||
      s.section?.toLowerCase().includes(searchTerm)
    );
    
    res.json(results);
  } catch (error) {
    res.status(500).json({ error: 'Error en la búsqueda' });
  }
};

// Actualizar puesto
export const updateStand = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;
    const userId = req.user?.id;

    let stands = readStands();
    const index = stands.findIndex(s => s.id === parseInt(id));
    
    if (index === -1) {
      return res.status(404).json({ error: 'Puesto no encontrado' });
    }

    // Verificar que el usuario sea dueño del puesto o admin
    if (stands[index].userId !== userId && req.user?.role !== 'admin') {
      return res.status(403).json({ error: 'No autorizado para modificar este puesto' });
    }

    // Actualizar solo campos permitidos
    const allowedUpdates = ['owner', 'products', 'description', 'history', 'image'];
    allowedUpdates.forEach(field => {
      if (updates[field] !== undefined) {
        stands[index][field] = updates[field];
      }
    });

    // Guardar cambios
    if (writeStands(stands)) {
      res.json(stands[index]);
    } else {
      res.status(500).json({ error: 'Error al actualizar el puesto' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar el puesto' });
  }
};