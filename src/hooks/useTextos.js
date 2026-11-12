import { useEffect, useMemo, useState } from "react";
import { TEXTOS_RESPALDO } from "../data/textosRespaldo.js";
import { obtenerTextos } from "../services/textos.js";

import { completarTextos } from "../utils/completarTextos.js";

export function useTextos(idioma) {
    const respaldo = useMemo(
        () => completarTextos(TEXTOS_RESPALDO[idioma], idioma),
        [idioma],
    );
    const [resultado, setResultado] = useState(null);
    const [intento, setIntento] = useState(0);

    const mismoIdioma = resultado?.idioma === idioma;
    const corresponde = mismoIdioma && resultado?.intento === intento;

    const textos = (mismoIdioma ? resultado.textos : null) ?? respaldo;

    useEffect(() => {
        const controlador = new AbortController();
        const limite = setTimeout(() => controlador.abort(), 12000);
        let vigente = true;

        async function cargarTextos() {
            try {
                const nuevosTextos = await obtenerTextos(
                    idioma,
                    controlador.signal,
                );

                if (vigente) {
                    setResultado({
                        idioma,
                        intento,
                        textos: nuevosTextos,
                        error: false,
                    });
                }
            } catch (error) {
                if (vigente) {
                    console.error("Error al cargar los textos:", error);

                    setResultado((anterior) => ({
                        idioma,
                        intento,
                        textos:
                            anterior?.idioma === idioma
                                ? anterior.textos
                                : null,
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
        textos,
        cargando: !corresponde,
        error: corresponde ? resultado.error : false,
        recargar: () => setIntento((valor) => valor + 1),
    };
}
