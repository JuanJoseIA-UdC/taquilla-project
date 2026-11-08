const API = `${import.meta.env.VITE_API_URL}/eventos`;

function esTexto(valor) {
    return typeof valor === "string" && valor.trim() !== "";
}

function esColor(valor) {
    return (
        typeof valor === "string" &&
        /^#(?:[0-9a-f]{3}|[0-9a-f]{6})$/i.test(valor)
    );
}

function esEventoValido(evento) {
    const textos = [
        evento?.id,
        evento?.slug,
        evento?.titulo,
        evento?.fecha,
        evento?.recinto?.nombre,
        evento?.recinto?.ciudad,
    ];

    return (
        textos.every(esTexto) &&
        Number.isFinite(Date.parse(evento.fecha)) &&
        Number.isInteger(evento.precioDesde) &&
        evento.precioDesde >= 0 &&
        esColor(evento.afiche?.color1) &&
        esColor(evento.afiche?.color2)
    );
}

export async function obtenerEventosDestacados(signal) {
    const respuesta = await fetch(`${API}/destacados`, { signal });

    if (!respuesta.ok) {
        throw new Error(`HTTP ${respuesta.status}`);
    }

    const contenido = await respuesta.json();

    if (!Array.isArray(contenido?.datos)) {
        throw new Error("La respuesta de destacados no contiene una lista.");
    }

    if (!contenido.datos.every(esEventoValido)) {
        throw new Error(
            "La respuesta de destacados contiene eventos incompletos o inválidos.",
        );
    }

    return contenido.datos;
}
