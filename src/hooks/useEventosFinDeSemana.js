import { useEffect, useState } from "react";
import { obtenerEventosFinDeSemana } from "../services/eventos";

export function useEventosFinDeSemana(ciudadSeleccionada) {
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
            try {
                const eventos = await obtenerEventosFinDeSemana(
                    solicitud,
                    controlador.signal,
                );

                if (vigente) {
                    setResultado({
                        intento,
                        solicitud,
                        eventos,
                        error: false,
                    });
                }
            } catch (error) {
                if (vigente) {
                    console.error(
                        "Error al cargar los eventos del fin de semana:",
                        error,
                    );
                    setResultado({
                        intento,
                        solicitud,
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
        eventos: corresponde ? resultado.eventos : [],
        cargando: !corresponde,
        error: corresponde ? resultado.error : false,
        recargar: () => setIntento((valor) => valor + 1),
    };
}
