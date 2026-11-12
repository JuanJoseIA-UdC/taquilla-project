import { obtenerEstadoContenido } from "../../utils/estadoContenido.js";
import { Link } from "react-router";
import EstadoContenido from "../ui/EstadoContenido.jsx";
import ListaEventos from "../events/ListaEventos.jsx";
import Icono from "../ui/Icono.jsx";
import "./ProximosInicio.css";

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

    const tipoEstado = obtenerEstadoContenido({
        cargando: datos.cargando,
        error: datos.error,
        vacio: datos.eventos.length === 0,
    });

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
        contenido = (
            <ListaEventos
                eventos={datos.eventos}
                categorias={categorias}
                textosTarjeta={textosTarjeta}
                idioma={idioma}
                className="proximos-inicio-lista"
            />
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
