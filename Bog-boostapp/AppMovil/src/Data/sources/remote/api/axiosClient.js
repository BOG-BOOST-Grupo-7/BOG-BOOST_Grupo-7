import axios from "axios";

export const axiosClient = axios.create({
  // IMPORTANTE: Cambia "TU_IP_LOCAL" por la IP de tu PC en la red Wi-Fi (ej: 192.168.1.15)
  // O usa tu IP de red local (puedes verla ejecutando 'ipconfig' en la terminal de Windows)
  baseURL: "http://10.1.195.195:3000/api", 
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});