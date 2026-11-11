import { obtenerLimitesPrecio } from "../services/explorar.js";
import { useConsulta } from "./useConsulta.js";

export function useLimitesPrecio() {
    const consulta = useConsulta(obtenerLimitesPrecio);

    return {
        limites: consulta.datos,
        cargando: consulta.cargando,
        error: consulta.error,
        recargar: consulta.recargar,
    };
}
