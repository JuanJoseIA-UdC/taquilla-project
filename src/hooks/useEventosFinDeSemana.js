import { obtenerEventosFinDeSemana } from "../services/eventos.js";
import { useConsulta } from "./useConsulta.js";

function cargarFinDeSemana(signal, ciudad) {
    return obtenerEventosFinDeSemana(ciudad, signal);
}

export function useEventosFinDeSemana(ciudadSeleccionada) {
    const ciudad = ciudadSeleccionada.trim().toLocaleLowerCase("es-CO");
    const consulta = useConsulta(cargarFinDeSemana, ciudad);

    return {
        eventos: consulta.datos ?? [],
        cargando: consulta.cargando,
        error: consulta.error,
        recargar: consulta.recargar,
    };
}
