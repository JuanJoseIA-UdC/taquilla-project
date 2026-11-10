import { obtenerRangoFinDeSemana } from "../utils/finDeSemana.js";

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

async function obtenerEventosEnIntervalo(
    ciudad,
    signal,
    { cantidad, desde = -Infinity, hasta = Infinity },
) {
    if (!esTexto(ciudad)) {
        throw new Error("Se necesita una ciudad para consultar eventos.");
    }

    const ciudadSeleccionada = ciudad.trim();
    const ciudadNormalizada = ciudadSeleccionada.toLocaleLowerCase("es-CO");
    const ahora = Date.now();
    const eventos = [];
    let pagina = 1;
    let paginas = 1;

    while (pagina <= paginas && eventos.length < cantidad) {
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

        const coincidencias = contenido.datos.filter((evento) => {
            const fecha = Date.parse(evento.fecha);
            const mismaCiudad =
                evento.recinto.ciudad.trim().toLocaleLowerCase("es-CO") ===
                ciudadNormalizada;

            return (
                mismaCiudad && fecha > ahora && fecha >= desde && fecha < hasta
            );
        });

        eventos.push(...coincidencias);

        // La API entrega los eventos ordenados por fecha ascendente.
        // Si alcanzamos el final del intervalo, no necesitamos más páginas.
        const alcanzoLimite = contenido.datos.some(
            (evento) => Date.parse(evento.fecha) >= hasta,
        );

        if (alcanzoLimite) {
            break;
        }

        paginas = paginacion.paginas;
        pagina += 1;
    }

    return eventos.slice(0, cantidad);
}

export async function obtenerProximosEventos(ciudad, signal) {
    return obtenerEventosEnIntervalo(ciudad, signal, {
        cantidad: 4,
    });
}

export async function obtenerEventosFinDeSemana(ciudad, signal) {
    const rango = obtenerRangoFinDeSemana();

    return obtenerEventosEnIntervalo(ciudad, signal, {
        cantidad: 3,
        desde: Date.parse(rango.desde),
        hasta: Date.parse(rango.hasta),
    });
}

export async function obtenerPaginaEventos(
    {
        categoria = "",
        ciudad = "",
        q = "",
        orden = "fecha",
        pagina = 1,
        porPagina = 20,
    } = {},
    signal,
) {
    const parametros = new URLSearchParams({
        orden,
        pagina: String(pagina),
        porPagina: String(porPagina),
    });

    for (const [nombre, valor] of Object.entries({ categoria, ciudad, q })) {
        const texto = valor.trim();

        if (texto) {
            parametros.set(nombre, texto);
        }
    }

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
        !Number.isSafeInteger(paginacion?.pagina) ||
        paginacion.pagina < 1 ||
        !Number.isSafeInteger(paginacion?.porPagina) ||
        paginacion.porPagina < 1 ||
        !Number.isSafeInteger(paginacion?.total) ||
        paginacion.total < 0 ||
        !Number.isSafeInteger(paginacion?.paginas) ||
        paginacion.paginas < 0 ||
        (paginacion.total > 0 && paginacion.paginas === 0) ||
        (paginacion.paginas > 0 && paginacion.pagina > paginacion.paginas) ||
        contenido.datos.length > paginacion.porPagina ||
        contenido.datos.length > paginacion.total
    ) {
        throw new Error("La respuesta contiene una paginación inválida.");
    }

    return {
        eventos: contenido.datos,
        paginacion,
    };
}
