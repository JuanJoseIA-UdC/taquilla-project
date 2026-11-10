const ORDENES = ["fecha", "precio", "popularidad"];
const PERIODOS = ["hoy", "fin-de-semana", "mes"];

function normalizarFiltros({
    q = "",
    ciudad = "",
    categorias = [],
    orden = "fecha",
    pagina = 1,
    periodo = "",
} = {}) {
    const textoPagina = String(pagina);
    const numeroPagina = Number(textoPagina);
    const paginaValida =
        /^\d+$/.test(textoPagina) &&
        Number.isSafeInteger(numeroPagina) &&
        numeroPagina >= 1;

    const categoriasUnicas = [
        ...new Set(
            categorias.map((categoria) => categoria.trim()).filter(Boolean),
        ),
    ];

    return {
        q: q.trim(),
        ciudad: ciudad.trim(),
        categorias: categoriasUnicas,
        orden: ORDENES.includes(orden) ? orden : "fecha",
        pagina: paginaValida ? numeroPagina : 1,
        periodo: PERIODOS.includes(periodo) ? periodo : "",
    };
}

export function leerFiltrosExplorar(consulta = "") {
    const parametros = new URLSearchParams(consulta);

    return normalizarFiltros({
        q: parametros.get("q") ?? "",
        ciudad: parametros.get("ciudad") ?? "",
        categorias: parametros.getAll("categoria"),
        orden: parametros.get("orden") ?? "fecha",
        pagina: parametros.get("pagina") ?? "1",
        periodo: parametros.get("periodo") ?? "",
    });
}

export function crearRutaExplorar(filtros = {}) {
    const { q, ciudad, categorias, orden, pagina, periodo } =
        normalizarFiltros(filtros);

    const parametros = new URLSearchParams();

    if (q) {
        parametros.set("q", q);
    }

    if (ciudad) {
        parametros.set("ciudad", ciudad);
    }

    for (const categoria of categorias) {
        parametros.append("categoria", categoria);
    }

    if (orden !== "fecha") {
        parametros.set("orden", orden);
    }

    if (pagina !== 1) {
        parametros.set("pagina", String(pagina));
    }

    if (periodo) {
        parametros.set("periodo", periodo);
    }

    const consulta = parametros.toString();

    return consulta ? `/explorar?${consulta}` : "/explorar";
}
