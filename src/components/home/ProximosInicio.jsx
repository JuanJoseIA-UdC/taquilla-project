import { Link } from "react-router";
import TarjetaEvento from "../events/TarjetaEvento.jsx";
import Icono from "../ui/Icono.jsx";
import "./ProximosInicio.css";
import { crearFormateadoresEvento } from "../../utils/formatoEventos.js";
import EstadoContenido from "../ui/EstadoContenido.jsx";

export default function ProximosInicio({
    datos,
    categorias,
    textos,
    textoVerTodos,
    textosTarjeta,
    estados,
    idioma,
}) {
    const titulo = textos.titulo.replace("{ciudad}", datos.ciudad || "—");

    const parametros = new URLSearchParams({
        ciudad: datos.ciudad,
        orden: "fecha",
    });

    let tipoEstado = null;

    if (datos.cargando) {
        tipoEstado = "cargando";
    } else if (datos.error) {
        tipoEstado = "error";
    } else if (datos.eventos.length === 0) {
        tipoEstado = "vacio";
    }

    let contenido;

    if (tipoEstado) {
        contenido = (
            <EstadoContenido
                tipo={tipoEstado}
                textos={estados}
                onReintentar={datos.recargar}
                className="proximos-inicio-estado"
            />
        );
    } else {
        const { formatoFecha, formatoHora, formatoPrecio } =
            crearFormateadoresEvento(idioma);

        const nombresCategorias = new Map(
            categorias.map((categoria) => [categoria.id, categoria.nombre]),
        );

        contenido = (
            <ul className="proximos-inicio-lista">
                {datos.eventos.map((evento) => {
                    const fecha = new Date(evento.fecha);

                    return (
                        <li key={evento.id}>
                            <TarjetaEvento
                                categoria={
                                    nombresCategorias.get(evento.categoria) ??
                                    evento.categoria
                                }
                                titulo={evento.titulo}
                                fecha={`${formatoFecha.format(fecha)} · ${formatoHora.format(fecha)}`}
                                fechaISO={evento.fecha}
                                lugar={`${evento.recinto.nombre}, ${evento.recinto.ciudad}`}
                                precio={formatoPrecio.format(
                                    evento.precioDesde,
                                )}
                                textoDesde={textosTarjeta.desde}
                                textoVerEvento={textosTarjeta.botones.verEvento}
                                href={`/eventos/${encodeURIComponent(evento.slug)}`}
                                afiche={evento.afiche}
                            />
                        </li>
                    );
                })}
            </ul>
        );
    }

    return (
        <section
            className="proximos-inicio"
            aria-labelledby="proximos-inicio-titulo"
        >
            <div className="proximos-inicio-encabezado">
                <div className="proximos-inicio-textos">
                    <h2
                        id="proximos-inicio-titulo"
                        className="proximos-inicio-titulo"
                    >
                        {titulo}
                    </h2>
                    <p className="proximos-inicio-subtitulo">
                        {textos.subtitulo}
                    </p>
                </div>

                {datos.ciudad && (
                    <Link
                        to={`/explorar?${parametros}`}
                        className="proximos-inicio-enlace"
                    >
                        {textoVerTodos}
                        <Icono
                            nombre="flechaDerecha"
                            className="proximos-inicio-flecha"
                        />
                    </Link>
                )}
            </div>

            {contenido}
        </section>
    );
}
