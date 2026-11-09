export function obtenerRangoFinDeSemana(fechaReferencia = new Date()) {
    if (
        !(fechaReferencia instanceof Date) ||
        !Number.isFinite(fechaReferencia.getTime())
    ) {
        throw new Error("La fecha de referencia no es válida.");
    }

    const partes = new Intl.DateTimeFormat("en-US", {
        timeZone: "America/Bogota",
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
    }).formatToParts(fechaReferencia);

    const valores = Object.fromEntries(
        partes.map(({ type, value }) => [type, value]),
    );

    const anio = Number(valores.year);
    const mes = Number(valores.month) - 1;
    const dia = Number(valores.day);

    const fechaCalendario = new Date(Date.UTC(anio, mes, dia));
    const diasDesdeLunes = (fechaCalendario.getUTCDay() + 6) % 7;
    const viernes = dia + 4 - diasDesdeLunes;

    // En Bogotá, las 00:00 corresponden a las 05:00 UTC.
    const desde = new Date(Date.UTC(anio, mes, viernes, 5));
    const hasta = new Date(Date.UTC(anio, mes, viernes + 3, 5));

    return {
        desde: desde.toISOString(),
        hasta: hasta.toISOString(),
    };
}
