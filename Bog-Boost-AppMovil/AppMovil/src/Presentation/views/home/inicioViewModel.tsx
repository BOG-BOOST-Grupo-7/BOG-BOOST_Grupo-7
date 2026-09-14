import { useEffect, useRef, useState } from "react";
import { heroImages } from "../shared/AppData";

// ViewModel encargado del carrusel automático de imágenes destacadas de la pantalla de Inicio.
export function useHomeCarousel() {
    // Índice de la imagen actualmente visible dentro del carrusel.
    const [heroIdx, setHeroIdx] = useState(0);
    const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

    // Efecto que inicia un temporizador para avanzar automáticamente el carrusel cada 3.5 segundos.
    useEffect(() => {
        timerRef.current = setInterval(() => setHeroIdx((i) => (i + 1) % heroImages.length), 3500);
        return () => { if (timerRef.current) clearInterval(timerRef.current); };
    }, []);

    return { heroIdx, images: heroImages };
}
