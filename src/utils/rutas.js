export function crearRutaExplorar({ q = "", ciudad = "" } = {}) {
    const parametros = new URLSearchParams();

    if (q.trim()) {
        parametros.set("q", q.trim());
    }

    if (ciudad.trim()) {
        parametros.set("ciudad", ciudad.trim());
    }

    const consulta = parametros.toString();

    return consulta ? `/explorar?${consulta}` : "/explorar";
}
