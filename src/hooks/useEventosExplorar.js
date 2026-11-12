import { obtenerEventosExplorar } from "../services/explorar.js";
import { leerFiltrosExplorar } from "../utils/rutas.js";
import { useConsulta } from "./useConsulta.js";

function cargarEventosExplorar(signal, clave) {
    const filtros = JSON.parse(clave);

    return obtenerEventosExplorar(filtros, signal);
}

export function useEventosExplorar(consultaURL = "") {
    const filtros = leerFiltrosExplorar(consultaURL);

    const clave = JSON.stringify({
        ...filtros,
        categorias: [...filtros.categorias].sort(),
    });

    const consulta = useConsulta(cargarEventosExplorar, clave);

    return {
        filtros,
        eventos: consulta.datos?.eventos ?? [],
        paginacion: consulta.datos?.paginacion ?? null,
        cargando: consulta.cargando,
        error: consulta.error,
        recargar: consulta.recargar,
    };
}
