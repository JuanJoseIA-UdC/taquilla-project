import { useLocation, useNavigate } from "react-router";
import { useEventosExplorar } from "../hooks/useEventosExplorar.js";
import { useCategorias } from "../hooks/useCategorias.js";
import EncabezadoExplorar from "../components/explore/EncabezadoExplorar.jsx";
import ContenidoExplorar from "../components/explore/ContenidoExplorar.jsx";
import ResultadosExplorar from "../components/explore/ResultadosExplorar.jsx";
import FiltrosExplorar from "../components/explore/FiltrosExplorar.jsx";
import { crearRutaExplorar } from "../utils/rutas.js";

export default function Explorar({ textos, idioma }) {
    const { search } = useLocation();
    const navigate = useNavigate();
    const datos = useEventosExplorar(search);
    const categorias = useCategorias();

    function cambiarCategorias(seleccionadas) {
        navigate(
            crearRutaExplorar({
                ...datos.filtros,
                categorias: seleccionadas,
                pagina: 1,
            }),
        );
    }

    function cambiarFecha(cambios) {
        navigate(
            crearRutaExplorar({
                ...datos.filtros,
                ...cambios,
                pagina: 1,
            }),
        );
    }

    function limpiarFiltros() {
        navigate(
            crearRutaExplorar({
                orden: datos.filtros.orden,
            }),
        );
    }

    function reintentar() {
        if (datos.error) {
            datos.recargar();
        }

        if (categorias.error) {
            categorias.recargar();
        }
    }

    const resultados = {
        eventos: datos.eventos,
        cargando: datos.cargando || categorias.cargando,
        error: datos.error || categorias.error,
        recargar: reintentar,
    };

    const total =
        resultados.cargando || resultados.error
            ? null
            : (datos.paginacion?.total ?? null);

    return (
        <section aria-labelledby="explorar-titulo">
            <EncabezadoExplorar textos={textos} total={total} idioma={idioma} />

            <ContenidoExplorar
                filtros={
                    <FiltrosExplorar
                        categorias={categorias}
                        seleccionadas={datos.filtros.categorias}
                        textos={textos.paginas.explorar.filtros}
                        estados={textos.estados}
                        onCambiarCategorias={cambiarCategorias}
                        onLimpiar={limpiarFiltros}
                        idioma={idioma}
                        filtros={datos.filtros}
                        textoAplicar={textos.general.acciones.aplicar}
                        onCambiarFecha={cambiarFecha}
                    />
                }
            >
                <ResultadosExplorar
                    datos={resultados}
                    categorias={categorias.categorias}
                    textosTarjeta={textos.paginas.inicio.tarjeta}
                    estados={textos.estados}
                    idioma={idioma}
                />
            </ContenidoExplorar>
        </section>
    );
}
