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
}) {
    return (
        <article className="tarjeta-evento">
            <div className="tarjeta-evento-imagen" />

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

                    <a
                        className="boton boton--secundario boton--m tarjeta-evento-enlace"
                        href={href}
                    >
                        {textoVerEvento}
                    </a>
                </div>
            </div>
        </article>
    );
}
