import { obtenerCiudades } from "../services/ciudades.js";
import { obtenerProximosEventos } from "../services/eventos.js";
import { useConsulta } from "./useConsulta.js";

async function cargarProximosEventos(signal, solicitud) {
    const ciudades = await obtenerCiudades(signal);
    const ciudad =
        ciudades.find(
            (opcion) =>
                opcion.nombre.trim().toLocaleLowerCase("es-CO") === solicitud,
        )?.nombre ?? "";

    try {
        const eventos = ciudad
            ? await obtenerProximosEventos(ciudad, signal)
            : [];

        return { ciudad, eventos, error: false };
    } catch (error) {
        if (!signal.aborted) {
            console.error("Error al cargar los próximos eventos:", error);
        }

        // Conserva la ciudad resuelta aunque falle la consulta de eventos.
        return { ciudad, eventos: [], error: true };
    }
}

export function useProximosEventos(ciudadSeleccionada = "Manizales") {
    const solicitud = ciudadSeleccionada.trim().toLocaleLowerCase("es-CO");
    const consulta = useConsulta(cargarProximosEventos, solicitud);

    return {
        ciudad: consulta.datos?.ciudad ?? "",
        eventos: consulta.datos?.eventos ?? [],
        cargando: consulta.cargando,
        error: consulta.error || (consulta.datos?.error ?? false),
        recargar: consulta.recargar,
    };
}
