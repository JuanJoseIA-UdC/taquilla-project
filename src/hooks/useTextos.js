import { useEffect, useState } from "react";

const API = "https://yanethm-taquilla-api.fly.dev/api/v1/textos";
const CLAVES_MENU = [
    "explorar",
    "conciertos",
    "teatro",
    "deportes",
    "festivales",
];

function validarTextos(datos) {
    const textos = datos?.textos;
    const nav = textos?.navbar;
    const etiquetas = [
        nav?.logo?.texto,
        nav?.logo?.aria,
        ...CLAVES_MENU.map((clave) => nav?.enlaces?.[clave]),
        nav?.buscador?.placeholder,
        nav?.buscador?.aria,
        nav?.aria?.idioma,
        nav?.botones?.ingresar,
        nav?.enlaces?.venderEventos,
        textos?.menuMovil?.abrir,
        textos?.menuMovil?.cerrar,
    ];

    if (
        !etiquetas.every((valor) => typeof valor === "string" && valor.trim())
    ) {
        throw new Error("La respuesta no contiene los textos del navbar.");
    }
    return textos;
}

export function useTextos(idioma) {
    const [resultado, setResultado] = useState(null);
    const [intento, setIntento] = useState(0);

    const corresponde =
        resultado?.idioma === idioma && resultado?.intento === intento;

    useEffect(() => {
        const controlador = new AbortController();
        const limite = setTimeout(() => controlador.abort(), 12000);
        let vigente = true;

        async function cargarTextosNavbar() {
            try {
                const respuesta = await fetch(`${API}?idioma=${idioma}`, {
                    signal: controlador.signal,
                });

                if (!respuesta.ok) {
                    throw new Error(`HTTP ${respuesta.status}`);
                }

                const datos = await respuesta.json();
                const textos = validarTextos(datos);

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
                    setResultado({
                        idioma,
                        intento,
                        textos: null,
                        error: true,
                    });
                }
            } finally {
                clearTimeout(limite);
            }
        }

        cargarTextosNavbar();

        return () => {
            vigente = false;
            clearTimeout(limite);
            controlador.abort();
        };
    }, [idioma, intento]);

    return {
        textos: corresponde ? resultado.textos : null,
        cargando: !corresponde,
        error: corresponde ? resultado.error : false,
        recargar: () => setIntento((valor) => valor + 1),
    };
}
