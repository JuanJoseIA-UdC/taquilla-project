import { useEffect, useState } from "react";
import { obtenerEventosDestacados } from "../services/eventos.js";

export function useEventosDestacados() {
    const [resultado, setResultado] = useState(null);
    const [intento, setIntento] = useState(0);

    const corresponde = resultado?.intento === intento;

    useEffect(() => {
        const controlador = new AbortController();
        const limite = setTimeout(() => controlador.abort(), 12000);
        let vigente = true;

        async function cargarEventos() {
            try {
                const eventos = await obtenerEventosDestacados(
                    controlador.signal,
                );

                if (vigente) {
                    setResultado({
                        intento,
                        eventos,
                        error: false,
                    });
                }
            } catch (error) {
                if (vigente) {
                    console.error("Error al cargar los destacados:", error);

                    setResultado({
                        intento,
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
    }, [intento]);

    return {
        eventos: corresponde ? resultado.eventos : [],
        cargando: !corresponde,
        error: corresponde ? resultado.error : false,
        recargar: () => setIntento((valor) => valor + 1),
    };
}
