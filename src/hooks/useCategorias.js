import { useEffect, useState } from "react";
import { obtenerCategorias } from "../services/categorias.js";

export function useCategorias() {
    const [resultado, setResultado] = useState(null);
    const [intento, setIntento] = useState(0);

    const corresponde = resultado?.intento === intento;

    useEffect(() => {
        const controlador = new AbortController();
        const limite = setTimeout(() => controlador.abort(), 12000);
        let vigente = true;

        async function cargarCategorias() {
            try {
                const categorias = await obtenerCategorias(controlador.signal);

                if (vigente) {
                    setResultado({
                        intento,
                        categorias,
                        error: false,
                    });
                }
            } catch (error) {
                if (vigente) {
                    console.error("Error al cargar las categorias:", error);

                    setResultado({
                        intento,
                        categorias: [],
                        error: true,
                    });
                }
            } finally {
                clearTimeout(limite);
            }
        }

        cargarCategorias();

        return () => {
            vigente = false;
            clearTimeout(limite);
            controlador.abort();
        };
    }, [intento]);

    return {
        categorias: corresponde ? resultado.categorias : [],
        cargando: !corresponde,
        error: corresponde ? resultado.error : false,
        recargar: () => setIntento((valor) => valor + 1),
    };
}
