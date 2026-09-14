// Interfaz que define la estructura estándar de las respuestas enviadas por la API remota del servidor.
export interface ResponseApiDelivery {
    success: boolean;
    message: string;
    data: any;
    error: any;
}
