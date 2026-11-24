import { useConsulta } from "../../hooks/useConsulta.js";
import { obtenerEventosRelacionados } from "../../services/eventos.js";
import { obtenerEstadoContenido } from "../../utils/estadoContenido.js";
import ListaEventos from "../events/ListaEventos.jsx";
import EstadoContenido from "../ui/EstadoContenido.jsx";
import "./RelacionadosEvento.css";

export default function RelacionadosEvento({
    slug,
    titulo,
    categorias,
    textosTarjeta,
    estados,
    idioma,
}) {
    const { datos, cargando, error, recargar } = useConsulta(
        obtenerEventosRelacionados,
        slug,
    );

    const eventos = datos ?? [];
    const tipoEstado = obtenerEstadoContenido({
        cargando,
        error,
        vacio: eventos.length === 0,
    });

    return (
        <section
            className="relacionados-evento"
            aria-labelledby="relacionados-evento-titulo"
        >
            <h2 id="relacionados-evento-titulo">{titulo}</h2>

            {tipoEstado ? (
                <EstadoContenido
                    tipo={tipoEstado}
                    textos={estados}
                    onReintentar={recargar}
                />
            ) : (
                <ListaEventos
                    eventos={eventos}
                    categorias={categorias}
                    textosTarjeta={textosTarjeta}
                    idioma={idioma}
                    className="relacionados-evento-lista"
                />
            )}
        </section>
    );
}
