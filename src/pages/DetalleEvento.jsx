import { useParams } from "react-router";
import EstadoContenido from "../components/ui/EstadoContenido.jsx";
import { useConsulta } from "../hooks/useConsulta.js";
import { useCategorias } from "../hooks/useCategorias.js";
import { useEffect } from "react";
import { obtenerDetalleEvento } from "../services/eventos.js";
import NoEncontrado from "./NoEncontrado.jsx";
import PortadaEvento from "../components/detail/PortadaEvento.jsx";
import ContenidoEvento from "../components/detail/ContenidoEvento.jsx";
import RelacionadosEvento from "../components/detail/RelacionadosEvento.jsx";

export default function DetalleEvento({ textos, idioma }) {
    const { slug } = useParams();
    const { categorias } = useCategorias();
    const {
        datos: evento,
        cargando,
        error,
        codigoError,
        recargar,
    } = useConsulta(obtenerDetalleEvento, slug);

    useEffect(() => {
        if (!evento) return;

        const tituloAnterior = document.title;
        document.title = evento.titulo;

        return () => {
            document.title = tituloAnterior;
        };
    }, [evento]);

    if (cargando || error) {
        return (
            <EstadoContenido
                tipo={cargando ? "cargando" : "error"}
                textos={textos.estados}
                mensajeError={
                    textos.errores?.[codigoError] ?? textos.errores?.generico
                }
                onReintentar={recargar}
            />
        );
    }

    if (evento === null) {
        return <NoEncontrado textos={textos} />;
    }

    const nombreCategoria =
        categorias.find((categoria) => categoria.id === evento.categoria)
            ?.nombre ?? evento.categoria;

    return (
        <section aria-labelledby="detalle-evento-titulo">
            <meta name="description" content={evento.descripcion} />
            <PortadaEvento
                titulo={evento.titulo}
                afiche={evento.afiche}
                enlaces={textos.navbar.enlaces}
                acciones={textos.paginas.detalle}
            />
            <ContenidoEvento
                evento={evento}
                nombreCategoria={nombreCategoria}
                textos={textos.paginas.detalleEvento}
                idioma={idioma}
            />
            <RelacionadosEvento
                slug={evento.slug}
                titulo={textos.paginas.detalleEvento.relacionados.titulo}
                categorias={categorias}
                textosTarjeta={textos.paginas.inicio.tarjeta}
                estados={textos.estados}
                errores={textos.errores}
                idioma={idioma}
            />
        </section>
    );
}
