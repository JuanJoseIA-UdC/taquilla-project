import { Link } from "react-router";
import "./TarjetaEventoCompacta.css";

export default function TarjetaEventoCompacta({
    titulo,
    fecha,
    fechaISO,
    precio,
    textoDesde,
    textoVerEvento,
    href,
    afiche,
}) {
    const estiloAfiche = afiche
        ? {
              backgroundImage: `linear-gradient(
              135deg,
              ${afiche.color1} 0%,
              ${afiche.color2} 71.43%
          )`,
          }
        : undefined;

    return (
        <Link
            to={href}
            className="tarjeta-evento-compacta"
            aria-label={`${textoVerEvento}: ${titulo}`}
        >
            <span
                className="tarjeta-evento-compacta-miniatura"
                style={estiloAfiche}
                aria-hidden="true"
            />

            <div className="tarjeta-evento-compacta-contenido">
                <h3 className="tarjeta-evento-compacta-titulo">{titulo}</h3>

                <time
                    dateTime={fechaISO}
                    className="tarjeta-evento-compacta-fecha"
                >
                    {fecha}
                </time>

                <p className="tarjeta-evento-compacta-precio">
                    {textoDesde} {precio}
                </p>
            </div>
        </Link>
    );
}
