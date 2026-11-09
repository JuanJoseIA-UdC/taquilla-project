const API = `${import.meta.env.VITE_API_URL}/ciudades`;

function esCiudadValida(ciudad) {
    return (
        typeof ciudad?.nombre === "string" &&
        ciudad.nombre.trim() !== "" &&
        Number.isInteger(ciudad.eventos) &&
        ciudad.eventos >= 0
    );
}

export async function obtenerCiudades(signal) {
    const respuesta = await fetch(API, { signal });

    if (!respuesta.ok) {
        throw new Error(`HTTP ${respuesta.status}`);
    }

    const contenido = await respuesta.json();

    if (!Array.isArray(contenido?.datos)) {
        throw new Error("La respuesta de ciudades no contiene una lista.");
    }

    if (!contenido.datos.every(esCiudadValida)) {
        throw new Error(
            "La respuesta de ciudades contiene datos incompletos o inválidos.",
        );
    }

    return contenido.datos;
}
