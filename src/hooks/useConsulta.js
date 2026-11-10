import { useEffect, useState } from "react";

export function useConsulta(cargar, clave = "") {
    const [resultado, setResultado] = useState(null);
    const [intento, setIntento] = useState(0);

    const corresponde =
        resultado?.cargar === cargar &&
        resultado?.clave === clave &&
        resultado?.intento === intento;

    useEffect(() => {
        const controlador = new AbortController();
        const limite = setTimeout(() => controlador.abort(), 12000);
        let vigente = true;

        async function ejecutarConsulta() {
            try {
                const datos = await cargar(controlador.signal, clave);

                if (vigente) {
                    setResultado({
                        cargar,
                        clave,
                        intento,
                        datos,
                        error: false,
                    });
                }
            } catch (error) {
                if (vigente) {
                    console.error("Error al consultar datos:", error);

                    setResultado({
                        cargar,
                        clave,
                        intento,
                        datos: null,
                        error: true,
                    });
                }
            } finally {
                clearTimeout(limite);
            }
        }

        ejecutarConsulta();

        return () => {
            vigente = false;
            clearTimeout(limite);
            controlador.abort();
        };
    }, [cargar, clave, intento]);

    return {
        datos: corresponde ? resultado.datos : null,
        cargando: !corresponde,
        error: corresponde ? resultado.error : false,
        recargar: () => setIntento((valor) => valor + 1),
    };
}
