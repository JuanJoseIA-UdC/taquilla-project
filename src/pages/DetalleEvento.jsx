import { useParams } from "react-router";
import EstadoContenido from "../components/ui/EstadoContenido.jsx";
import { useConsulta } from "../hooks/useConsulta.js";
import { obtenerDetalleEvento } from "../services/eventos.js";
import NoEncontrado from "./NoEncontrado.jsx";

export default function DetalleEvento({ textos }) {
    const { slug } = useParams();
    const {
        datos: evento,
        cargando,
        error,
        recargar,
    } = useConsulta(obtenerDetalleEvento, slug);

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
            <h1 id="detalle-evento-titulo">{evento.titulo}</h1>
            <p>{evento.descripcion}</p>
        </section>
    );
}