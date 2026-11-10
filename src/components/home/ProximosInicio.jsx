import { Link } from "react-router";
import TarjetaEvento from "../events/TarjetaEvento.jsx";
import Boton from "../ui/Boton.jsx";
import Icono from "../ui/Icono.jsx";
import "./ProximosInicio.css";
import { crearFormateadoresEvento } from "../../utils/formatoEventos.js";

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

    let contenido;

    if (datos.cargando) {
        contenido = (
            <div className="proximos-inicio-estado" role="status">
                <p>{estados.cargando.indicador}</p>
            </div>
        );
    } else if (datos.error) {
        contenido = (
            <div className="proximos-inicio-estado">
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
            <div className="proximos-inicio-estado" role="status">
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
