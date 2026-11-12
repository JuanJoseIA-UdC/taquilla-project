import { IDIOMAS_SOPORTADOS } from "../config/idiomas.js";

const API = `${import.meta.env.VITE_API_URL}/idiomas`;

export async function obtenerIdiomas(signal) {
    const respuesta = await fetch(API, { signal });

    if (!respuesta.ok) {
        throw new Error(`HTTP ${respuesta.status}`);
    }

    const contenido = await respuesta.json();
    const idiomas = contenido?.datos;

    if (
        !Array.isArray(idiomas) ||
        idiomas.length === 0 ||
        !idiomas.every(
            (idioma) =>
                IDIOMAS_SOPORTADOS.includes(idioma?.codigo) &&
                typeof idioma.nombre === "string" &&
                idioma.nombre.trim() !== "",
        )
    ) {
        throw new Error("La respuesta de idiomas contiene opciones inválidas.");
    }

    const codigos = idiomas.map((idioma) => idioma.codigo);

    if (
        new Set(codigos).size !== codigos.length ||
        !codigos.includes(contenido.predeterminado)
    ) {
        throw new Error(
            "La respuesta de idiomas contiene una configuración inválida.",
        );
    }

    return codigos;
}
