import { Link } from "react-router";
import Etiqueta from "../ui/Etiqueta.jsx";
import Icono from "../ui/Icono.jsx";
import "../ui/Boton.css";
import "./TarjetaEvento.css";

export default function TarjetaEvento({
    categoria,
    titulo,
    fecha,
    fechaISO,
    lugar,
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
        <article className="tarjeta-evento">
            <div
                className="tarjeta-evento-imagen"
                style={estiloAfiche}
                aria-hidden="true"
            />

            <div className="tarjeta-evento-contenido">
                <Etiqueta tono="marca">{categoria}</Etiqueta>

                <h3 className="tarjeta-evento-titulo">{titulo}</h3>

                <div className="tarjeta-evento-dato">
                    <Icono
                        nombre="calendario"
                        className="tarjeta-evento-icono"
                    />
                    <time dateTime={fechaISO}>{fecha}</time>
                </div>

                <div className="tarjeta-evento-dato">
                    <Icono
                        nombre="ubicacion"
                        className="tarjeta-evento-icono"
                    />
                    <span>{lugar}</span>
                </div>

                <div className="tarjeta-evento-pie">
                    <div className="tarjeta-evento-precio">
                        <span className="tarjeta-evento-desde">
                            {textoDesde}
                        </span>
                        <span className="tarjeta-evento-importe">{precio}</span>
                    </div>

                    <Link
                        className="boton boton--secundario boton--m tarjeta-evento-enlace"
                        to={href}
                        aria-label={`${textoVerEvento}: ${titulo}`}
                    >
                        {textoVerEvento}
                    </Link>
                </div>
            </div>
        </article>
    );
}
