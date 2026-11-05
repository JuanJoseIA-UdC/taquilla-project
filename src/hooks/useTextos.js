import { useEffect, useState } from "react";
import { obtenerTextos } from "../services/textos.js";

export function useTextos(idioma) {
    const [resultado, setResultado] = useState(null);
    const [intento, setIntento] = useState(0);

    const corresponde =
        resultado?.idioma === idioma && resultado?.intento === intento;

    useEffect(() => {
        const controlador = new AbortController();
        const limite = setTimeout(() => controlador.abort(), 12000);
        let vigente = true;

        async function cargarTextos() {
            try {
                const textos = await obtenerTextos(idioma, controlador.signal);

                if (vigente) {
                    setResultado({
                        idioma,
                        intento,
                        textos,
                        error: false,
                    });
                }
            } catch (error) {
                if (vigente) {
                    console.error("Error al cargar los textos:", error);
                    setResultado((anterior) => ({
                        idioma,
                        intento,
                        textos: anterior?.textos ?? null,
                        error: true,
                    }));
                }
            } finally {
                clearTimeout(limite);
            }
        }

        cargarTextos();

        return () => {
            vigente = false;
            clearTimeout(limite);
            controlador.abort();
        };
    }, [idioma, intento]);

    return {
        textos: resultado?.textos ?? null,
        cargando: !corresponde,
        error: corresponde ? resultado.error : false,
        recargar: () => setIntento((valor) => valor + 1),
    };
}
