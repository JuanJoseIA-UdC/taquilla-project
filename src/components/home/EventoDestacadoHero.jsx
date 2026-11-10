import { Link } from "react-router";
import Etiqueta from "../ui/Etiqueta.jsx";
import { crearFormateadoresEvento } from "../../utils/formatoEventos.js";
import EstadoContenido from "../ui/EstadoContenido.jsx";
import "./EventoDestacadoHero.css";

export default function EventoDestacadoHero({
    datos,
    textos,
    estados,
    idioma,
}) {
    const evento = datos.eventos[0];
    let tipoEstado = null;

    if (datos.cargando) {
        tipoEstado = "cargando";
    } else if (datos.error) {
        tipoEstado = "error";
    } else if (!evento) {
        tipoEstado = "vacio";
    }

    if (tipoEstado) {
        return (
            <EstadoContenido
                tipo={tipoEstado}
                textos={estados}
                onReintentar={datos.recargar}
                className="evento-destacado-hero evento-destacado-hero--estado"
            />
        );
    }

    const { formatoFecha, formatoPrecio } = crearFormateadoresEvento(idioma);

    const fecha = formatoFecha.format(new Date(evento.fecha));
    const precio = formatoPrecio.format(evento.precioDesde);
    const textoPrecio = textos.desde.replace("{precio}", () => precio);

    return (
        <article
            className="evento-destacado-hero"
            style={{
                backgroundImage: `linear-gradient(
                    135deg,
                    ${evento.afiche.color1} 0%,
                    ${evento.afiche.color2} 71.43%
                )`,
            }}
        >
            <div className="evento-destacado-hero-ficha">
                <Etiqueta tono="marca">{textos.etiqueta}</Etiqueta>

                <h2 className="evento-destacado-hero-titulo">
                    {evento.titulo}
                </h2>

                <div className="evento-destacado-hero-pie">
                    <div className="evento-destacado-hero-datos">
                        <p className="evento-destacado-hero-fecha">
                            <time dateTime={evento.fecha}>{fecha}</time>
                            {" · "}
                            {evento.recinto.nombre}
                        </p>

                        <p className="evento-destacado-hero-precio">
                            {textoPrecio}
                        </p>
                    </div>

                    <Link
                        to={`/eventos/${encodeURIComponent(evento.slug)}`}
                        className="boton boton--primario boton--m evento-destacado-hero-enlace"
                        aria-label={`${textos.botones.verEvento}: ${evento.titulo}`}
                    >
                        {textos.botones.verEvento}
                    </Link>
                </div>
            </div>
        </article>
    );
}
