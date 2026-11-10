import { obtenerCategorias } from "../services/categorias.js";
import { useConsulta } from "./useConsulta.js";

export function useCategorias() {
    const consulta = useConsulta(obtenerCategorias);

    return {
        categorias: consulta.datos ?? [],
        cargando: consulta.cargando,
        error: consulta.error,
        recargar: consulta.recargar,
    };
}
