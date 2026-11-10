import { obtenerEventosDestacados } from "../services/eventos.js";
import { useConsulta } from "./useConsulta.js";

export function useEventosDestacados() {
    const consulta = useConsulta(obtenerEventosDestacados);

    return {
        eventos: consulta.datos ?? [],
        cargando: consulta.cargando,
        error: consulta.error,
        recargar: consulta.recargar,
    };
}
