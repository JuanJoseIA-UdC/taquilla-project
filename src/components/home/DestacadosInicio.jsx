import { obtenerEstadoContenido } from "../../utils/estadoContenido.js";
import { Link } from "react-router";
import ListaEventos from "../events/ListaEventos.jsx";
import EstadoContenido from "../ui/EstadoContenido.jsx";
import Icono from "../ui/Icono.jsx";
import "./DestacadosInicio.css";

export default function DestacadosInicio({
    datos,
    categorias,
    textos,
    tituloMovil,
    textosTarjeta,
    estados,
    idioma,
}) {
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
                className="destacados-inicio-estado"
            />
        );
    } else {
        contenido = (
            <ListaEventos
                eventos={datos.eventos.slice(0, 4)}
                categorias={categorias}
                textosTarjeta={textosTarjeta}
                idioma={idioma}
                className="destacados-inicio-lista"
            />
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
