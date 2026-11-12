import { useEffect, useState } from "react";
import { leerCookie, guardarCookie, eliminarCookie } from "../utils/cookies.js";

const IDIOMAS_VALIDOS = ["es", "en"];
const CONSENTIMIENTOS_VALIDOS = ["aceptado", "rechazado"];

function leerPreferenciasIniciales() {
    const consentimientoGuardado = leerCookie("consentimiento");

    const consentimiento = CONSENTIMIENTOS_VALIDOS.includes(
        consentimientoGuardado,
    )
        ? consentimientoGuardado
        : null;

    const idiomaGuardado =
        consentimiento === "aceptado" ? leerCookie("idioma") : null;

    return {
        consentimiento,
        idioma: IDIOMAS_VALIDOS.includes(idiomaGuardado)
            ? idiomaGuardado
            : "es",
        error: false,
    };
}

export function usePreferencias() {
    const [preferencias, setPreferencias] = useState(leerPreferenciasIniciales);

    const { idioma, consentimiento, error } = preferencias;

    useEffect(() => {
        document.documentElement.lang = idioma;
    }, [idioma]);

    useEffect(() => {
        if (consentimiento !== "aceptado") {
            eliminarCookie("idioma");
        }
    }, [consentimiento]);

    function cambiarIdioma(nuevoIdioma) {
        if (!IDIOMAS_VALIDOS.includes(nuevoIdioma)) {
            return;
        }

        const guardado =
            consentimiento === "aceptado"
                ? guardarCookie("idioma", nuevoIdioma)
                : eliminarCookie("idioma");

        setPreferencias((actuales) => ({
            ...actuales,
            idioma: nuevoIdioma,
            error: !guardado,
        }));
    }

    function guardarConsentimiento(permitir) {
        if (typeof permitir !== "boolean") {
            return false;
        }

        const nuevoConsentimiento = permitir ? "aceptado" : "rechazado";

        const consentimientoGuardado = guardarCookie(
            "consentimiento",
            nuevoConsentimiento,
        );

        const idiomaGuardado = permitir
            ? guardarCookie("idioma", idioma)
            : eliminarCookie("idioma");

        const guardado = consentimientoGuardado && idiomaGuardado;

        setPreferencias((actuales) => ({
            ...actuales,
            consentimiento: nuevoConsentimiento,
            error: !guardado,
        }));

        return guardado;
    }

    return {
        idioma,
        consentimiento,
        error,
        cambiarIdioma,
        guardarConsentimiento,
    };
}
