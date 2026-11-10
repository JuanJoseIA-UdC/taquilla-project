import { useEffect, useState } from "react";
import { obtenerCiudades } from "../services/ciudades.js";
import { obtenerProximosEventos } from "../services/eventos.js";

export function useProximosEventos(ciudadSeleccionada = "Manizales") {
    const [resultado, setResultado] = useState(null);
    const [intento, setIntento] = useState(0);
    const solicitud = ciudadSeleccionada.trim().toLocaleLowerCase("es-CO");

    const corresponde =
        resultado?.intento === intento && resultado?.solicitud === solicitud;

    useEffect(() => {
        const controlador = new AbortController();
        const limite = setTimeout(() => controlador.abort(), 12000);
        let vigente = true;

        async function cargarEventos() {
            let ciudad = "";

            try {
                const ciudades = await obtenerCiudades(controlador.signal);
                ciudad =
                    ciudades.find(
                        (opcion) =>
                            opcion.nombre.trim().toLocaleLowerCase("es-CO") ===
                            solicitud,
                    )?.nombre ?? "";
                const eventos = ciudad
                    ? await obtenerProximosEventos(ciudad, controlador.signal)
                    : [];

                if (vigente) {
                    setResultado({
                        intento,
                        solicitud,
                        ciudad,
                        eventos,
                        error: false,
                    });
                }
            } catch (error) {
                if (vigente) {
                    console.error(
                        "Error al cargar los próximos eventos:",
                        error,
                    );

                    setResultado({
                        intento,
                        solicitud,
                        ciudad,
                        eventos: [],
                        error: true,
                    });
                }
            } finally {
                clearTimeout(limite);
            }
        }
        cargarEventos();

        return () => {
            vigente = false;
            clearTimeout(limite);
            controlador.abort();
        };
    }, [intento, solicitud]);

    return {
        ciudad: corresponde ? resultado.ciudad : "",
        eventos: corresponde ? resultado.eventos : [],
        cargando: !corresponde,
        error: corresponde ? resultado.error : false,
        recargar: () => setIntento((valor) => valor + 1),
    };
}
