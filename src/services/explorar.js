import { obtenerPaginaEventos } from "./eventos.js";
import { obtenerRangoFechasEventos } from "../utils/rangoFechasEventos.js";

const EVENTOS_POR_PAGINA = 9;
const TAMANO_LOTE = 20;

async function obtenerTodosLosEventos(parametros, signal) {
    const primera = await obtenerPaginaEventos(
        {
            ...parametros,
            pagina: 1,
            porPagina: TAMANO_LOTE,
        },
        signal,
    );

    const eventos = [...primera.eventos];

    for (let pagina = 2; pagina <= primera.paginacion.paginas; pagina += 1) {
        signal?.throwIfAborted();

        const resultado = await obtenerPaginaEventos(
            {
                ...parametros,
                pagina,
                porPagina: TAMANO_LOTE,
            },
            signal,
        );

        if (resultado.paginacion.pagina !== pagina) {
            throw new Error(
                "La paginación del catálogo cambió durante la consulta. Intenta de nuevo.",
            );
        }

        eventos.push(...resultado.eventos);
    }
    return eventos;
}

export async function obtenerEventosExplorar(filtros = {}, signal) {
    const {
        categorias = [],
        ciudad = "",
        q = "",
        orden = "fecha",
        pagina = 1,
        periodo = "",
        fechaDesde = "",
        fechaHasta = "",
        precioMin = null,
        precioMax = null,
    } = filtros;

    const parametros = {
        ciudad,
        q,
        orden,
        categoria: categorias.length === 1 ? categorias[0] : "",
    };

    const necesitaFiltradoLocal =
        categorias.length > 1 ||
        Boolean(periodo || fechaDesde || fechaHasta) ||
        precioMin !== null ||
        precioMax !== null;

    if (!necesitaFiltradoLocal) {
        return obtenerPaginaEventos(
            {
                ...parametros,
                pagina,
                porPagina: EVENTOS_POR_PAGINA,
            },
            signal,
        );
    }
    const rango = obtenerRangoFechasEventos(filtros);
    const eventos = await obtenerTodosLosEventos(parametros, signal);

    signal?.throwIfAborted();

    const categoriasSeleccionadas = new Set(categorias);

    const coincidencias = eventos.filter((evento) => {
        const fecha = Date.parse(evento.fecha);

        const cumpleCategoria =
            categoriasSeleccionadas.size === 0 ||
            categoriasSeleccionadas.has(evento.categoria);

        const cumpleFecha = fecha >= rango.desde && fecha < rango.hasta;

        const cumplePrecio =
            (precioMin === null || evento.precioDesde >= precioMin) &&
            (precioMax === null || evento.precioDesde <= precioMax);

        return cumpleCategoria && cumpleFecha && cumplePrecio;
    });

    const total = coincidencias.length;
    const paginas = Math.max(1, Math.ceil(total / EVENTOS_POR_PAGINA));
    const paginaActual = Math.min(pagina, paginas);
    const inicio = (paginaActual - 1) * EVENTOS_POR_PAGINA;

    return {
        eventos: coincidencias.slice(inicio, inicio + EVENTOS_POR_PAGINA),
        paginacion: {
            pagina: paginaActual,
            porPagina: EVENTOS_POR_PAGINA,
            total,
            paginas,
        },
    };
}

export async function obtenerLimitesPrecio(signal) {
    const primera = await obtenerPaginaEventos(
        {
            orden: "precio",
            pagina: 1,
            porPagina: 1,
        },
        signal,
    );

    if (primera.paginacion.total === 0) {
        return {
            minimo: 0,
            maximo: 0,
            hayEventos: false,
        };
    }

    const ultima =
        primera.paginacion.paginas === 1
            ? primera
            : await obtenerPaginaEventos(
                  {
                      orden: "precio",
                      pagina: primera.paginacion.paginas,
                      porPagina: 1,
                  },
                  signal,
              );

    signal?.throwIfAborted();

    const eventoMasCaro = ultima.eventos.at(-1);

    if (
        !eventoMasCaro ||
        ultima.paginacion.pagina !== ultima.paginacion.paginas
    ) {
        throw new Error(
            "El catálogo cambió durante la consulta de precios. Intenta de nuevo.",
        );
    }

    return {
        minimo: 0,
        maximo: eventoMasCaro.precioDesde,
        hayEventos: true,
    };
}
