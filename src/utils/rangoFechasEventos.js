import { obtenerRangoFinDeSemana } from "./finDeSemana.js";

const MILISEGUNDOS_POR_DIA = 24 * 60 * 60 * 1000;

function inicioDiaBogota(fecha) {
    return Date.parse(`${fecha}T00:00:00-05:00`);
}

function obtenerFechaBogota(fechaReferencia) {
    const partes = new Intl.DateTimeFormat("en-US", {
        timeZone: "America/Bogota",
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
    }).formatToParts(fechaReferencia);

    const valores = Object.fromEntries(
        partes.map(({ type, value }) => [type, value]),
    );

    return `${valores.year}-${valores.month}-${valores.day}`;
}

// Recibe filtros previamente normalizados por las utilidades de rutas.
export function obtenerRangoFechasEventos(
    { periodo = "", fechaDesde = "", fechaHasta = "" } = {},
    fechaReferencia = new Date(),
) {
    if (
        !(fechaReferencia instanceof Date) ||
        !Number.isFinite(fechaReferencia.getTime())
    ) {
        throw new Error("La fecha de referencia no es válida.");
    }

    if (fechaDesde || fechaHasta) {
        return {
            desde: fechaDesde ? inicioDiaBogota(fechaDesde) : -Infinity,
            hasta: fechaHasta
                ? inicioDiaBogota(fechaHasta) + MILISEGUNDOS_POR_DIA
                : Infinity,
        };
    }

    if (periodo === "fin-de-semana") {
        const rango = obtenerRangoFinDeSemana(fechaReferencia);

        return {
            desde: Date.parse(rango.desde),
            hasta: Date.parse(rango.hasta),
        };
    }

    if (periodo === "hoy") {
        const fecha = obtenerFechaBogota(fechaReferencia);
        const desde = inicioDiaBogota(fecha);

        return {
            desde,
            hasta: desde + MILISEGUNDOS_POR_DIA,
        };
    }

    if (periodo === "mes") {
        const fecha = obtenerFechaBogota(fechaReferencia);
        const primerDia = `${fecha.slice(0, 7)}-01`;
        const desde = inicioDiaBogota(primerDia);
        const siguienteMes = new Date(desde);

        siguienteMes.setUTCMonth(siguienteMes.getUTCMonth() + 1);

        return {
            desde,
            hasta: siguienteMes.getTime(),
        };
    }

    return {
        desde: -Infinity,
        hasta: Infinity,
    };
}
