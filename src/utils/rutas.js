const ORDENES = ["fecha", "precio", "popularidad"];
const PERIODOS = ["hoy", "fin-de-semana", "mes"];

function normalizarFecha(valor) {
    if (typeof valor !== "string" || !/^\d{4}-\d{2}-\d{2}$/.test(valor)) {
        return "";
    }

    const fecha = new Date(`${valor}T00:00:00.000Z`);

    if (
        !Number.isFinite(fecha.getTime()) ||
        fecha.toISOString().slice(0, 10) !== valor
    ) {
        return "";
    }

    return valor;
}

function normalizarPrecio(valor) {
    const texto = String(valor ?? "").trim();

    if (!/^\d+$/.test(texto)) {
        return null;
    }

    const numero = Number(texto);

    return Number.isSafeInteger(numero) ? numero : null;
}

function normalizarFiltros({
    q = "",
    ciudad = "",
    categorias = [],
    orden = "fecha",
    pagina = 1,
    periodo = "",
    fechaDesde = "",
    fechaHasta = "",
    precioMin = null,
    precioMax = null,
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

    let desde = normalizarFecha(fechaDesde);
    let hasta = normalizarFecha(fechaHasta);
    let minimo = normalizarPrecio(precioMin);
    let maximo = normalizarPrecio(precioMax);

    if (desde && hasta && desde > hasta) {
        [desde, hasta] = [hasta, desde];
    }

    if (minimo !== null && maximo !== null && minimo > maximo) {
        [minimo, maximo] = [maximo, minimo];
    }

    const periodoValido = PERIODOS.includes(periodo) ? periodo : "";

    return {
        q: q.trim(),
        ciudad: ciudad.trim(),
        categorias: categoriasUnicas,
        orden: ORDENES.includes(orden) ? orden : "fecha",
        pagina: paginaValida ? numeroPagina : 1,
        periodo: desde || hasta ? "" : periodoValido,
        fechaDesde: desde,
        fechaHasta: hasta,
        precioMin: minimo,
        precioMax: maximo,
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
        fechaDesde: parametros.get("fechaDesde") ?? "",
        fechaHasta: parametros.get("fechaHasta") ?? "",
        precioMin: parametros.get("precioMin"),
        precioMax: parametros.get("precioMax"),
    });
}

export function crearRutaExplorar(filtros = {}) {
    const {
        q,
        ciudad,
        categorias,
        orden,
        pagina,
        periodo,
        fechaDesde,
        fechaHasta,
        precioMin,
        precioMax,
    } = normalizarFiltros(filtros);

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

    if (fechaDesde) {
        parametros.set("fechaDesde", fechaDesde);
    }

    if (fechaHasta) {
        parametros.set("fechaHasta", fechaHasta);
    }

    if (precioMin !== null) {
        parametros.set("precioMin", String(precioMin));
    }

    if (precioMax !== null) {
        parametros.set("precioMax", String(precioMax));
    }

    const consulta = parametros.toString();

    return consulta ? `/explorar?${consulta}` : "/explorar";
}
