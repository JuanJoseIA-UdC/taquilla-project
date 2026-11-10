const API = `${import.meta.env.VITE_API_URL}/categorias`;

function esTexto(valor) {
    return typeof valor === "string" && valor.trim() !== "";
}

function esCategoriaValida(categoria) {
    return (
        esTexto(categoria?.id) &&
        esTexto(categoria?.nombre) &&
        Number.isInteger(categoria?.eventos) &&
        categoria.eventos >= 0
    );
}

export async function obtenerCategorias(signal) {
    const respuesta = await fetch(API, { signal });

    if (!respuesta.ok) {
        throw new Error(`HTTP ${respuesta.status}`);
    }

    const contenido = await respuesta.json();

    if (!Array.isArray(contenido?.datos)) {
        throw new Error("La respuesta de categorías no contiene una lista.");
    }

    if (!contenido.datos.every(esCategoriaValida)) {
        throw new Error(
            "La respuesta de categorías contiene datos incompletos o inválidos.",
        );
    }

    return contenido.datos;
}
