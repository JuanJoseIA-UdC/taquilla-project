import { obtenerCiudades } from "../services/ciudades.js";
import { useConsulta } from "./useConsulta.js";

export function useCiudades() {
    const consulta = useConsulta(obtenerCiudades);

    return {
        ciudades: consulta.datos ?? [],
        cargando: consulta.cargando,
        error: consulta.error,
        recargar: consulta.recargar,
    };
}
