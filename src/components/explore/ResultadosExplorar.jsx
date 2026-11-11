import ListaEventos from "../events/ListaEventos.jsx";
import EstadoContenido from "../ui/EstadoContenido.jsx";
import BarraResultados from "./BarraResultados.jsx";
import "./ResultadosExplorar.css";

export default function ResultadosExplorar({
    datos,
    categorias,
    filtros,
    textos,
    textosTarjeta,
    estados,
    idioma,
    onCambiarFiltros,
}) {
    let tipoEstado = null;

    if (datos.error) {
        tipoEstado = "error";
    } else if (datos.cargando) {
        tipoEstado = "cargando";
    } else if (datos.eventos.length === 0) {
        tipoEstado = "vacio";
    }

    return (
        <div className="resultados-explorar">
            <BarraResultados
                filtros={filtros}
                categorias={categorias}
                textos={textos}
                idioma={idioma}
                onCambiarFiltros={onCambiarFiltros}
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
        </div>
    );
}
