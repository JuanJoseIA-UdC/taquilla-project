import { useState } from "react";
import { iniciarSesion } from "../services/sesion.js";

export function useSesion() {
    const [sesion, setSesion] = useState(null);

    async function ingresar(credenciales, signal) {
        const nuevaSesion = await iniciarSesion(credenciales, signal);
        signal?.throwIfAborted();
        setSesion(nuevaSesion);
    }

    return {
        usuario: sesion?.usuario ?? null,
        ingresar,
    };
}
