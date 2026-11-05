import { OPCIONES_ACCESIBILIDAD } from "../config/accesibilidad.js";
const API = `${import.meta.env.VITE_API_URL}/textos`;

const CAMPOS_REQUERIDOS = [
    "navbar.logo.texto",
    "navbar.logo.aria",
    "navbar.enlaces.inicio",
    "navbar.enlaces.explorar",
    "navbar.buscador.placeholder",
    "navbar.buscador.aria",
    "navbar.aria.idioma",
    "navbar.aria.accesibilidad",
    "navbar.botones.ingresar",
    "navbar.botones.crearCuenta",

    "menuMovil.abrir",
    "menuMovil.cerrar",
    "menuMovil.secciones.idioma",
    "menuMovil.secciones.accesibilidad",

    "footer.lema",
    "footer.columnas.explora.titulo",
    "footer.columnas.explora.enlaces.inicio",
    "footer.columnas.explora.enlaces.explorar",
    "footer.columnas.cuenta.titulo",
    "footer.columnas.cuenta.enlaces.ingresar",
    "footer.columnas.cuenta.enlaces.crearCuenta",
    "footer.columnas.legal.titulo",
    "footer.columnas.legal.enlaces.terminos",
    "footer.columnas.legal.enlaces.accesibilidad",
    "footer.legal.derechos",
    "footer.legal.nota",

    "general.aria.cerrarDialogo",
    "accesibilidad.titulo",
    "accesibilidad.tamanoTexto",
    "accesibilidad.muestraTamano",
    "accesibilidad.nota",
    "accesibilidad.enlaces.declaracion",
    "accesibilidad.botones.restablecer",
    "accesibilidad.aria.aumentarTexto",
    "accesibilidad.aria.disminuirTexto",

    "paginas.noEncontrado.contenido.titulo",
    "paginas.noEncontrado.contenido.texto",
    "paginas.noEncontrado.contenido.botones.volverInicio",

    ...OPCIONES_ACCESIBILIDAD.flatMap((opcion) => [
        `accesibilidad.${opcion}.nombre`,
        `accesibilidad.${opcion}.descripcion`,
    ]),
];

function validarTextos(datos) {
    const textos = datos?.textos;

    const camposInvalidos = CAMPOS_REQUERIDOS.filter((ruta) => {
        const valor = ruta
            .split(".")
            .reduce((actual, clave) => actual?.[clave], textos);

        return typeof valor !== "string" || valor.trim() === "";
    });

    if (camposInvalidos.length > 0) {
        throw new Error(
            `La respuesta contiene textos ausentes o inválidos: ${camposInvalidos.join(", ")}`,
        );
    }

    return textos;
}

export async function obtenerTextos(idioma, signal) {
    const respuesta = await fetch(`${API}?idioma=${idioma}`, { signal });

    if (!respuesta.ok) {
        throw new Error(`HTTP ${respuesta.status}`);
    }

    return validarTextos(await respuesta.json());
}
