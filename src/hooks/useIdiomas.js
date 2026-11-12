import { IDIOMAS_SOPORTADOS } from "../config/idiomas.js";
import { obtenerIdiomas } from "../services/idiomas.js";
import { useConsulta } from "./useConsulta.js";

export function useIdiomas() {
    const consulta = useConsulta(obtenerIdiomas);

    return {
        idiomas: consulta.datos ?? IDIOMAS_SOPORTADOS,
    };
}
