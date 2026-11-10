export function crearFormateadoresEvento(idioma) {
    const locale = idioma === "en" ? "en-US" : "es-CO";
    const timeZone = "America/Bogota";

    const formatoFecha = new Intl.DateTimeFormat(locale, {
        timeZone,
        weekday: "short",
        day: "numeric",
        month: "short",
    });

    const formatoHora = new Intl.DateTimeFormat(locale, {
        timeZone,
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
    });

    const formatoPrecio = new Intl.NumberFormat(locale, {
        style: "currency",
        currency: "COP",
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
    });

    return {
        formatoFecha,
        formatoHora,
        formatoPrecio,
    };
}
