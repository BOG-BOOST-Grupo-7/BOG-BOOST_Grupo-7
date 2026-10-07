// Da formato de pesos colombianos (ej. 25000 -> "$25.000"). Se hace a mano para no depender de Intl en el dispositivo.
export const formatCOP = (value: number | string): string => {
    const n = Math.round(Number(value) || 0);
    return '$' + n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
};
