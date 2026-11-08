import { Link } from "react-router";
import Boton from "../ui/Boton.jsx";
import Etiqueta from "../ui/Etiqueta.jsx";
import "./EventoDestacadoHero.css";

export default function EventoDestacadoHero({
    datos,
    textos,
    estados,
    idioma,
}) {
    if (datos.cargando) {
        return (
            <div
                className="evento-destacado-hero evento-destacado-hero--estado"
                role="status"
            >
                <p>{estados.cargando.indicador}</p>
            </div>
        );
    }

    if (datos.error) {
        return (
            <div className="evento-destacado-hero evento-destacado-hero--estado">
                <div role="alert">
                    <p>
                        <strong>{estados.error.titulo}</strong>
                    </p>
                    <p>{estados.error.texto}</p>
                </div>

                <Boton variante="secundario" onClick={datos.recargar}>
                    {estados.error.botones.reintentar}
                </Boton>
            </div>
        );
    }

    const evento = datos.eventos[0];

    if (!evento) {
        return (
            <div
                className="evento-destacado-hero evento-destacado-hero--estado"
                role="status"
            >
                <p>
                    <strong>{estados.vacio.titulo}</strong>
                </p>
                <p>{estados.vacio.texto}</p>
            </div>
        );
    }

    const locale = idioma === "en" ? "en-US" : "es-CO";

    const fecha = new Intl.DateTimeFormat(locale, {
        timeZone: "America/Bogota",
        weekday: "short",
        day: "numeric",
        month: "short",
    }).format(new Date(evento.fecha));

    const precio = new Intl.NumberFormat(locale, {
        style: "currency",
        currency: "COP",
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
    }).format(evento.precioDesde);

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
