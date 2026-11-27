import { useEffect, useRef, useState } from "react";
import { cerrarSesion, iniciarSesion } from "../services/sesion.js";

export function useSesion() {
    const [sesion, setSesion] = useState(null);
    const [cerrando, setCerrando] = useState(false);
    const [errorCierre, setErrorCierre] = useState(false);
    const cierreRef = useRef(null);

    useEffect(() => {
        return () => {
            cierreRef.current?.abort();
            cierreRef.current = null;
        };
    }, []);

    async function ingresar(credenciales, signal) {
        const nuevaSesion = await iniciarSesion(credenciales, signal);
        signal?.throwIfAborted();
        setSesion(nuevaSesion);
        setErrorCierre(false);
    }

    async function cerrar() {
        if (cierreRef.current || !sesion) return false;

        const token = sesion.token;
        const controlador = new AbortController();

        cierreRef.current = controlador;
        setCerrando(true);
        setErrorCierre(false);

        const limite = setTimeout(() => controlador.abort(), 12000);

        try {
            await cerrarSesion(token, controlador.signal);

            if (cierreRef.current !== controlador) return false;

            setSesion((actual) => (actual?.token === token ? null : actual));

            return true;
        } catch {
            if (cierreRef.current === controlador) {
                setErrorCierre(true);
            }

            return false;
        } finally {
            clearTimeout(limite);

            if (cierreRef.current === controlador) {
                cierreRef.current = null;
                setCerrando(false);
            }
        }
    }

    return {
        usuario: sesion?.usuario ?? null,
        ingresar,
        cerrar,
        cerrando,
        errorCierre,
    };
}
