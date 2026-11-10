import { useLocation } from "react-router";
import { useEventosExplorar } from "../hooks/useEventosExplorar.js";
import { useCategorias } from "../hooks/useCategorias.js";
import EncabezadoExplorar from "../components/explore/EncabezadoExplorar.jsx";
import ContenidoExplorar from "../components/explore/ContenidoExplorar.jsx";
import ResultadosExplorar from "../components/explore/ResultadosExplorar.jsx";

export default function Explorar({ textos, idioma }) {
    const { search } = useLocation();
    const datos = useEventosExplorar(search);
    const categorias = useCategorias();

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

            <ContenidoExplorar>
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
