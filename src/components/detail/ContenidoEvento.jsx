import { useEffect } from "react";
import { Link, useLocation } from "react-router";
import Etiqueta from "../ui/Etiqueta.jsx";
import Icono from "../ui/Icono.jsx";
import { crearFormateadoresEvento } from "../../utils/formatoEventos.js";
import "./ContenidoEvento.css";

function DatoEvento({ icono, etiqueta, secundario, className = "", children }) {
    return (
        <div
            className={["contenido-evento-dato", className]
                .filter(Boolean)
                .join(" ")}
        >
            <span className="contenido-evento-dato-icono">
                <Icono nombre={icono} />
            </span>
            <div className="contenido-evento-dato-textos">
                <span className="contenido-evento-dato-etiqueta">
                    {etiqueta}
                </span>
                {children}
                {secundario != null && (
                    <span className="contenido-evento-dato-secundario">
                        {secundario}
                    </span>
                )}
            </div>
        </div>
    );
}

export default function ContenidoEvento({
    evento,
    nombreCategoria,
    textos,
    idioma,
}) {
    const { hash } = useLocation();
    const enComoLlegar = hash === "#detalle-como-llegar";

    useEffect(() => {
        if (
            hash === "#detalle-descripcion-titulo" ||
            hash === "#detalle-como-llegar"
        ) {
            document.getElementById(hash.slice(1))?.scrollIntoView();
        }
    }, [hash]);

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

    const horaInicio = formatoHora.format(inicio);
    const apertura = Date.parse(evento.puertas);

    const horaVisible = Number.isFinite(apertura)
        ? textos.info.horaValor
              .replace("{hora}", horaInicio)
              .replace("{puertas}", formatoHora.format(apertura))
        : horaInicio;

    const { nombre, ciudad, direccion } = evento.recinto;
    const direccionCompleta = [direccion, ciudad].filter(Boolean).join(", ");

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
                    <DatoEvento
                        icono="calendario"
                        etiqueta={textos.info.fecha}
                        secundario={horaVisible}
                    >
                        <time dateTime={evento.fecha}>{fecha}</time>
                    </DatoEvento>
                    <DatoEvento
                        icono="reloj"
                        etiqueta={textos.info.hora}
                        className="contenido-evento-dato--hora"
                    >
                        <time dateTime={evento.fecha}>{horaVisible}</time>
                    </DatoEvento>
                    <DatoEvento
                        icono="ubicacion"
                        etiqueta={textos.info.lugar}
                        secundario={direccionCompleta}
                    >
                        <span>
                            {nombre}
                            <span className="contenido-evento-ciudad-web">
                                , {ciudad}
                            </span>
                        </span>
                    </DatoEvento>
                </div>
            </header>

            <nav
                className="contenido-evento-pestanas"
                aria-labelledby="detalle-evento-titulo"
            >
                <Link
                    to="#detalle-descripcion-titulo"
                    aria-current={enComoLlegar ? undefined : "location"}
                >
                    {textos.pestanas.descripcion}
                </Link>

                <Link
                    to="#detalle-como-llegar"
                    aria-current={enComoLlegar ? "location" : undefined}
                >
                    {textos.pestanas.comoLlegar}
                </Link>

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

            <section
                className="contenido-evento-llegada"
                aria-labelledby="detalle-como-llegar"
            >
                <h2 id="detalle-como-llegar">{textos.pestanas.comoLlegar}</h2>

                <div className="contenido-evento-mapa">
                    <Icono nombre="ubicacion" />
                    <span>{textos.mapa.titulo}</span>
                </div>

                <p>
                    {nombre}
                    {" · "}
                    {direccionCompleta}
                </p>
            </section>
        </div>
    );
}
