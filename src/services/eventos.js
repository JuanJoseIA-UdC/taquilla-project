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
        evento?.categoria,
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

export async function obtenerProximosEventos(ciudad, signal) {
    if (!esTexto(ciudad)) {
        throw new Error(
            "Se necesita una ciudad para consultar próximos eventos.",
        );
    }

    const ciudadSeleccionada = ciudad.trim();
    const ciudadNormalizada = ciudadSeleccionada.toLocaleLowerCase("es-CO");
    const ahora = Date.now();
    const proximos = [];
    const cantidad = 4;
    let pagina = 1;
    let paginas = 1;

    while (pagina <= paginas && proximos.length < cantidad) {
        const parametros = new URLSearchParams({
            ciudad: ciudadSeleccionada,
            orden: "fecha",
            pagina: String(pagina),
            porPagina: "20",
        });

        const respuesta = await fetch(`${API}?${parametros}`, { signal });

        if (!respuesta.ok) {
            throw new Error(`HTTP ${respuesta.status}`);
        }

        const contenido = await respuesta.json();

        if (!Array.isArray(contenido?.datos)) {
            throw new Error("La respuesta de eventos no contiene una lista.");
        }

        if (!contenido.datos.every(esEventoValido)) {
            throw new Error(
                "La respuesta contiene eventos incompletos o inválidos.",
            );
        }

        const paginacion = contenido.paginacion;

        if (
            paginacion?.pagina !== pagina ||
            !Number.isInteger(paginacion?.paginas) ||
            paginacion.paginas < 0 ||
            (paginacion.paginas === 0 && contenido.datos.length > 0) ||
            (paginacion.paginas > 0 && paginacion.paginas < pagina)
        ) {
            throw new Error("La respuesta contiene una paginación inválida.");
        }

        const futuros = contenido.datos.filter(
            (evento) =>
                evento.recinto.ciudad.trim().toLocaleLowerCase("es-CO") ===
                    ciudadNormalizada && Date.parse(evento.fecha) > ahora,
        );

        proximos.push(...futuros);
        paginas = paginacion.paginas;
        pagina += 1;
    }

    return proximos.slice(0, cantidad);
}
