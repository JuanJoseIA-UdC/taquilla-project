import { Link } from "react-router";
import TarjetaEvento from "../events/TarjetaEvento.jsx";
import Boton from "../ui/Boton.jsx";
import Icono from "../ui/Icono.jsx";
import "./DestacadosInicio.css";
import { crearFormateadoresEvento } from "../../utils/formatoEventos.js";

export default function DestacadosInicio({
    datos,
    categorias,
    textos,
    tituloMovil,
    textosTarjeta,
    estados,
    idioma,
}) {
    let contenido;

    if (datos.cargando) {
        contenido = (
            <div className="destacados-inicio-estado" role="status">
                <p>{estados.cargando.indicador}</p>
            </div>
        );
    } else if (datos.error) {
        contenido = (
            <div className="destacados-inicio-estado">
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
    } else if (datos.eventos.length === 0) {
        contenido = (
            <div className="destacados-inicio-estado" role="status">
                <p>
                    <strong>{estados.vacio.titulo}</strong>
                </p>
                <p>{estados.vacio.texto}</p>
            </div>
        );
    } else {
        const { formatoFecha, formatoHora, formatoPrecio } =
            crearFormateadoresEvento(idioma);

        const nombresCategorias = new Map(
            categorias.map((categoria) => [categoria.id, categoria.nombre]),
        );

        contenido = (
            <ul className="destacados-inicio-lista">
                {datos.eventos.slice(0, 4).map((evento) => {
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
            className="destacados-inicio"
            aria-labelledby="destacados-inicio-titulo"
        >
            <div className="destacados-inicio-encabezado">
                <div className="destacados-inicio-textos">
                    <h2
                        id="destacados-inicio-titulo"
                        className="destacados-inicio-titulo"
                    >
                        <span className="destacados-inicio-titulo-web">
                            {textos.titulo}
                        </span>
                        <span className="destacados-inicio-titulo-movil">
                            {tituloMovil}
                        </span>
                    </h2>
                    <p className="destacados-inicio-subtitulo">
                        {textos.subtitulo}
                    </p>
                </div>
                <Link to="/explorar" className="destacados-inicio-enlace">
                    {textos.enlaces.verTodos}
                    <Icono
                        nombre="flechaDerecha"
                        className="destacados-inicio-flecha"
                    />
                </Link>
            </div>

            {contenido}
        </section>
    );
}
