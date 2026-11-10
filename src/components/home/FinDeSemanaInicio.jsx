import { Link } from "react-router";
import TarjetaEventoCompacta from "../events/TarjetaEventoCompacta.jsx";
import EstadoContenido from "../ui/EstadoContenido.jsx";
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
                className="fin-semana-inicio-estado"
            />
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
