import { useParams } from "react-router";
import EstadoContenido from "../components/ui/EstadoContenido.jsx";
import { useConsulta } from "../hooks/useConsulta.js";
import { useEffect } from "react";
import { obtenerDetalleEvento } from "../services/eventos.js";
import NoEncontrado from "./NoEncontrado.jsx";
import PortadaEvento from "../components/detail/PortadaEvento.jsx";

export default function DetalleEvento({ textos }) {
    const { slug } = useParams();
    const {
        datos: evento,
        cargando,
        error,
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
                onReintentar={recargar}
            />
        );
    }

    if (evento === null) {
        return <NoEncontrado textos={textos} />;
    }

    return (
        <section aria-labelledby="detalle-evento-titulo">
            <meta name="description" content={evento.descripcion} />
            <PortadaEvento
                titulo={evento.titulo}
                afiche={evento.afiche}
                enlaces={textos.navbar.enlaces}
                acciones={textos.paginas.detalle}
            />
            <h1 id="detalle-evento-titulo">{evento.titulo}</h1>
            <p>{evento.descripcion}</p>
        </section>
    );
}
