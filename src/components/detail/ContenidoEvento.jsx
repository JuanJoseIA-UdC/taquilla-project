import Etiqueta from "../ui/Etiqueta.jsx";
import Icono from "../ui/Icono.jsx";
import { crearFormateadoresEvento } from "../../utils/formatoEventos.js";
import "./ContenidoEvento.css";

export default function ContenidoEvento({
    evento,
    nombreCategoria,
    textos,
    idioma,
}) {
    const { titulo, descripcion, artistas, edadMinima } = evento;
    const tieneEdad = Number.isInteger(edadMinima) && edadMinima >= 0;
    const textoEdad =
        edadMinima === 0
            ? textos.etiquetas.todoPublico
            : textos.etiquetas.edadMinima.replace("{edad}", edadMinima);

    const { formatoFecha, formatoHora } = crearFormateadoresEvento(idioma, {
        incluirAnio: true,
    });
    const inicio = new Date(evento.fecha);
    const fechaFormateada = formatoFecha.format(inicio);
    const fecha =
        fechaFormateada.charAt(0).toLocaleUpperCase(idioma) +
        fechaFormateada.slice(1);

    const hora = formatoHora.format(inicio);
    const aperturaConfirmada =
        evento.slug === "noche-de-salsa-brava" &&
        descripcion.includes("Las puertas abren a las siete de la noche.");

    const horaVisible = aperturaConfirmada
        ? textos.info.horaValor
            .replace("{hora}", hora)
            .replace("{puertas}", "7:00")
        : hora;

    const { nombre, ciudad, direccion } = evento.recinto;

    return (
        <div className="contenido-evento">
            <header className="contenido-evento-encabezado">
                <div className="contenido-evento-etiquetas">
                    <Etiqueta tono="marca">{nombreCategoria}</Etiqueta>

                    {tieneEdad && (
                        <Etiqueta className="contenido-evento-edad">
                            {textoEdad}
                        </Etiqueta>
                    )}
                </div>

                <h1
                    id="detalle-evento-titulo"
                    className="contenido-evento-titulo"
                >
                    {titulo}
                </h1>

                {artistas?.length > 0 && (
                    <p className="contenido-evento-artistas">
                        {artistas.join(" · ")}
                    </p>
                )}
                <div className="contenido-evento-datos">
                    <div className="contenido-evento-dato">
                        <span className="contenido-evento-dato-icono">
                            <Icono nombre="calendario" />
                        </span>
                        <div className="contenido-evento-dato-textos">
                            <span className="contenido-evento-dato-etiqueta">
                                {textos.info.fecha}
                            </span>
                            <time dateTime={evento.fecha}>{fecha}</time>
                            <span className="contenido-evento-dato-secundario">
                                {horaVisible}
                            </span>
                        </div>
                    </div>

                    <div className="contenido-evento-dato contenido-evento-dato--hora">
                        <span className="contenido-evento-dato-icono">
                            <Icono nombre="reloj" />
                        </span>
                        <div className="contenido-evento-dato-textos">
                            <span className="contenido-evento-dato-etiqueta">
                                {textos.info.hora}
                            </span>
                            <time dateTime={evento.fecha}>{horaVisible}</time>
                        </div>
                    </div>

                    <div className="contenido-evento-dato">
                        <span className="contenido-evento-dato-icono">
                            <Icono nombre="ubicacion" />
                        </span>
                        <div className="contenido-evento-dato-textos">
                            <span className="contenido-evento-dato-etiqueta">
                                {textos.info.lugar}
                            </span>
                            <span>
                                {nombre}
                                <span className="contenido-evento-ciudad-web">
                                    , {ciudad}
                                </span>
                            </span>
                            <span className="contenido-evento-dato-secundario">
                                {[direccion, ciudad].filter(Boolean).join(", ")}
                            </span>
                        </div>
                    </div>
                </div>
            </header>

            <nav
                className="contenido-evento-pestanas"
                aria-labelledby="detalle-evento-titulo"
                >
                    <a href="#detalle-descripcion-titulo" aria-current="location">
                       {textos.pestanas.descripcion} 
                    </a>
                    <button type="button" disabled>
                        {textos.pestanas.comoLlegar}
                    </button>
                    <button type="button" disabled>
                        {textos.pestanas.politicas}
                    </button>

            </nav>

            <section
                className="contenido-evento-descripcion"
                aria-labelledby="detalle-descripcion-titulo"
            >
                <h2 id="detalle-descripcion-titulo">
                    {textos.descripcion.titulo}
                </h2>
                <p>{descripcion}</p>
            </section>
        </div>
    );
}
