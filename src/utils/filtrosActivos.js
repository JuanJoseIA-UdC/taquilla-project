import { crearFormateadoresEvento } from "./formatoEventos.js";

export function obtenerFiltrosActivos(filtros, categorias, textos, idioma) {
    const activos = [];
    const nombresCategorias = new Map(
        categorias.map((categoria) => [categoria.id, categoria.nombre]),
    );

    const { formatoPrecio } = crearFormateadoresEvento(idioma);
    const formatoFecha = new Intl.DateTimeFormat(
        idioma === "en" ? "en-US" : "es-CO",
        {
            timeZone: "America/Bogota",
            dateStyle: "medium",
        },
    );

    if (filtros.q) {
        activos.push({
            id: "q",
            etiqueta: `“${filtros.q}”`,
            cambios: { q: "" },
        });
    }

    for (const categoria of filtros.categorias) {
        activos.push({
            id: `categoria-${categoria}`,
            etiqueta: nombresCategorias.get(categoria) ?? categoria,
            cambios: {
                categorias: filtros.categorias.filter(
                    (actual) => actual !== categoria,
                ),
            },
        });
    }

    const nombresPeriodos = {
        hoy: textos.fecha.hoy,
        "fin-de-semana": textos.fecha.finDeSemana,
        mes: textos.fecha.mes,
    };

    if (filtros.periodo) {
        activos.push({
            id: "periodo",
            etiqueta: nombresPeriodos[filtros.periodo],
            cambios: { periodo: "" },
        });
    }

    for (const [campo, etiqueta] of [
        ["fechaDesde", textos.fecha.inicial],
        ["fechaHasta", textos.fecha.final],
    ]) {
        if (filtros[campo]) {
            const fecha = new Date(`${filtros[campo]}T00:00:00-05:00`);

            activos.push({
                id: campo,
                etiqueta: `${etiqueta}: ${formatoFecha.format(fecha)}`,
                cambios: { [campo]: "" },
            });
        }
    }

    if (filtros.ciudad) {
        activos.push({
            id: "ciudad",
            etiqueta: filtros.ciudad,
            cambios: { ciudad: "" },
        });
    }

    for (const [campo, etiqueta] of [
        ["precioMin", textos.precioMinimo],
        ["precioMax", textos.precioMaximo],
    ]) {
        if (filtros[campo] !== null) {
            activos.push({
                id: campo,
                etiqueta: `${etiqueta}: ${formatoPrecio.format(filtros[campo])}`,
                cambios: { [campo]: null },
            });
        }
    }

    return activos;
}
