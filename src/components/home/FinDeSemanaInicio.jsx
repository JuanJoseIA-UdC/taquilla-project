import { Link } from "react-router";
import TarjetaEventoCompacta from "../events/TarjetaEventoCompacta.jsx";
import Boton from "../ui/Boton.jsx";
import "./FinDeSemanaInicio.css";
import { crearFormateadoresEvento } from "../../utils/formatoEventos.js";

export default function FinDeSemanaInicio({
    datos,
    ciudad,
    titulo,
    textoVerTodos,
    textosTarjeta,
    estados,
    idioma,
}) {
    const parametros = new URLSearchParams({
        ciudad,
        orden: "fecha",
        periodo: "fin-de-semana",
    });

    let contenido;

    if (datos.cargando) {
        contenido = (
            <div className="fin-semana-inicio-estado" role="status">
                <p>{estados.cargando.indicador}</p>
            </div>
        );
    } else if (datos.error) {
        contenido = (
            <div className="fin-semana-inicio-estado">
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
            <div className="fin-semana-inicio-estado" role="status">
                <p>
                    <strong>{estados.vacio.titulo}</strong>
                </p>
                <p>{estados.vacio.texto}</p>
            </div>
        );
    } else {
        const { formatoFecha, formatoHora, formatoPrecio } =
            crearFormateadoresEvento(idioma);

        contenido = (
            <ul className="fin-semana-inicio-lista">
                {datos.eventos.map((evento) => {
                    const fecha = new Date(evento.fecha);

                    return (
                        <li key={evento.id}>
                            <TarjetaEventoCompacta
                                titulo={evento.titulo}
                                fecha={`${formatoFecha.format(fecha)} · ${formatoHora.format(fecha)}`}
                                fechaISO={evento.fecha}
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
            className="fin-semana-inicio"
            aria-labelledby="fin-semana-inicio-titulo"
        >
            <div className="fin-semana-inicio-encabezado">
                <h2
                    id="fin-semana-inicio-titulo"
                    className="fin-semana-inicio-titulo"
                >
                    {titulo}
                </h2>

                <Link
                    to={`/explorar?${parametros}`}
                    className="fin-semana-inicio-enlace"
                >
                    {textoVerTodos}
                </Link>
            </div>

            {contenido}
        </section>
    );
}
