import { useRef } from "react";
import ListaEventos from "../events/ListaEventos.jsx";
import EstadoContenido from "../ui/EstadoContenido.jsx";
import Paginacion from "../ui/Paginacion.jsx";
import BarraResultados from "./BarraResultados.jsx";
import "./ResultadosExplorar.css";

export default function ResultadosExplorar({
    datos,
    categorias,
    filtros,
    textos,
    textosTarjeta,
    textosPaginacion,
    estados,
    idioma,
    onCambiarFiltros,
    onCambiarPagina,
}) {
    const contenedorRef = useRef(null);

    let tipoEstado = null;

    if (datos.error) {
        tipoEstado = "error";
    } else if (datos.cargando) {
        tipoEstado = "cargando";
    } else if (datos.eventos.length === 0) {
        tipoEstado = "vacio";
    }

    function cambiarPagina(pagina) {
        const contenedor = contenedorRef.current;

        if (contenedor) {
            contenedor.focus({ preventScroll: true });
            contenedor.scrollIntoView({ block: "start" });
        }

        onCambiarPagina(pagina);
    }

    return (
        <div ref={contenedorRef} className="resultados-explorar" tabIndex={-1}>
            <BarraResultados
                filtros={filtros}
                categorias={categorias}
                textos={textos}
                idioma={idioma}
                onCambiarFiltros={onCambiarFiltros}
                total={
                    datos.cargando || datos.error
                        ? null
                        : (datos.paginacion?.total ?? null)
                }
            />

            {tipoEstado ? (
                <EstadoContenido
                    tipo={tipoEstado}
                    textos={estados}
                    onReintentar={datos.recargar}
                    className="explorar-estado"
                />
            ) : (
                <ListaEventos
                    eventos={datos.eventos}
                    categorias={categorias}
                    textosTarjeta={textosTarjeta}
                    idioma={idioma}
                    className="explorar-lista"
                />
            )}

            {!tipoEstado && datos.paginacion && (
                <Paginacion
                    pagina={datos.paginacion.pagina}
                    paginas={datos.paginacion.paginas}
                    textos={textosPaginacion}
                    onCambiar={cambiarPagina}
                />
            )}
        </div>
    );
}
