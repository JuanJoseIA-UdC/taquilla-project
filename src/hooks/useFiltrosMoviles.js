import { useState } from "react";
import { useEventosExplorar } from "./useEventosExplorar.js";
import {
    crearRutaExplorar,
    normalizarFiltrosExplorar,
} from "../utils/rutas.js";

function obtenerConsulta(filtros) {
    return crearRutaExplorar(filtros).split("?")[1] ?? "";
}

export function useFiltrosMoviles(filtrosIniciales) {
    const [seleccion, setSeleccion] = useState(() => ({
        filtros: normalizarFiltrosExplorar({
            ...filtrosIniciales,
            pagina: 1,
        }),
        revision: 0,
    }));

    const resultados = useEventosExplorar(obtenerConsulta(seleccion.filtros));

    function cambiar(cambios) {
        setSeleccion((actual) => ({
            ...actual,
            filtros: normalizarFiltrosExplorar({
                ...actual.filtros,
                ...cambios,
                pagina: 1,
            }),
        }));
    }

    function limpiar() {
        setSeleccion((actual) => ({
            filtros: normalizarFiltrosExplorar({
                orden: actual.filtros.orden,
            }),
            revision: actual.revision + 1,
        }));
    }

    return {
        filtros: seleccion.filtros,
        revision: seleccion.revision,
        resultados,
        cambiar,
        limpiar,
    };
}
