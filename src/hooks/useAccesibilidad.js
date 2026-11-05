import { useEffect, useState } from "react";

import {
    CLAVE_STORAGE,
    TAMANO_MINIMO,
    TAMANO_MAXIMO,
    PASO_TAMANO,
    OPCIONES_ACCESIBILIDAD,
} from "../config/accesibilidad.js";

function preferenciasDelSistema() {
    return {
        tamanoTexto: TAMANO_MINIMO,
        altoContraste: window.matchMedia("(prefers-contrast: more)").matches,
        reducirMovimiento: window.matchMedia("(prefers-reduced-motion: reduce)")
            .matches,
        subrayarEnlaces: false,
        espaciadoLectura: false,
    };
}

function limitarTamano(valor) {
    const redondeado = Math.round(valor / PASO_TAMANO) * PASO_TAMANO;

    return Math.min(TAMANO_MAXIMO, Math.max(TAMANO_MINIMO, redondeado));
}

function leerPreferencias() {
    const iniciales = preferenciasDelSistema();

    try {
        const guardadas = JSON.parse(localStorage.getItem(CLAVE_STORAGE));

        if (!guardadas || typeof guardadas !== "object") {
            return iniciales;
        }

        const preferencias = { ...iniciales };

        if (Number.isFinite(guardadas.tamanoTexto)) {
            preferencias.tamanoTexto = limitarTamano(guardadas.tamanoTexto);
        }

        for (const opcion of OPCIONES_ACCESIBILIDAD) {
            if (typeof guardadas[opcion] === "boolean") {
                preferencias[opcion] = guardadas[opcion];
            }
        }

        return preferencias;
    } catch {
        return iniciales;
    }
}

export function useAccesibilidad() {
    const [preferencias, setPreferencias] = useState(leerPreferencias);

    useEffect(() => {
        try {
            localStorage.setItem(CLAVE_STORAGE, JSON.stringify(preferencias));
        } catch {
            // Las preferencias siguen funcionando durante esta sesión
            // aunque el navegador no permita guardarlas.
        }
    }, [preferencias]);

    useEffect(() => {
        const raiz = document.documentElement;
        const tamanoAnterior = raiz.style.fontSize;

        raiz.style.fontSize = `${preferencias.tamanoTexto}%`;

        return () => {
            raiz.style.fontSize = tamanoAnterior;
        };
    }, [preferencias.tamanoTexto]);

    function aumentarTexto() {
        setPreferencias((actuales) => ({
            ...actuales,
            tamanoTexto: limitarTamano(actuales.tamanoTexto + PASO_TAMANO),
        }));
    }

    function disminuirTexto() {
        setPreferencias((actuales) => ({
            ...actuales,
            tamanoTexto: limitarTamano(actuales.tamanoTexto - PASO_TAMANO),
        }));
    }
    useEffect(() => {
        const raiz = document.documentElement;
        const atributos = {
            "data-alto-contraste": preferencias.altoContraste,
            "data-subrayar-enlaces": preferencias.subrayarEnlaces,
            "data-reducir-movimiento": preferencias.reducirMovimiento,
            "data-espaciado-lectura": preferencias.espaciadoLectura,
        };

        const anteriores = Object.fromEntries(
            Object.keys(atributos).map((nombre) => [
                nombre,
                raiz.getAttribute(nombre),
            ]),
        );

        for (const [nombre, activo] of Object.entries(atributos)) {
            raiz.setAttribute(nombre, String(activo));
        }

        return () => {
            for (const [nombre, valor] of Object.entries(anteriores)) {
                if (valor === null) {
                    raiz.removeAttribute(nombre);
                } else {
                    raiz.setAttribute(nombre, valor);
                }
            }
        };
    }, [
        preferencias.altoContraste,
        preferencias.subrayarEnlaces,
        preferencias.reducirMovimiento,
        preferencias.espaciadoLectura,
    ]);

    function cambiarOpcion(opcion, activada) {
        if (
            !OPCIONES_ACCESIBILIDAD.includes(opcion) ||
            typeof activada !== "boolean"
        ) {
            return;
        }

        setPreferencias((actuales) => ({
            ...actuales,
            [opcion]: activada,
        }));
    }

    function restablecer() {
        setPreferencias(preferenciasDelSistema());
    }

    return {
        preferencias,
        aumentarTexto,
        disminuirTexto,
        cambiarOpcion,
        restablecer,
        puedeAumentar: preferencias.tamanoTexto < TAMANO_MAXIMO,
        puedeDisminuir: preferencias.tamanoTexto > TAMANO_MINIMO,
    };
}
