import ListaEventos from "../events/ListaEventos.jsx";
import EstadoContenido from "../ui/EstadoContenido.jsx";
import "./ResultadosExplorar.css";

export default function ResultadosExplorar({
    datos,
    categorias,
    textosTarjeta,
    estados,
    idioma,
}) {
    let tipoEstado = null;

    if (datos.error) {
        tipoEstado = "error";
    } else if (datos.cargando) {
        tipoEstado = "cargando";
    } else if (datos.eventos.length === 0) {
        tipoEstado = "vacio";
    }

    if (tipoEstado) {
        return (
            <EstadoContenido
                tipo={tipoEstado}
                textos={estados}
                onReintentar={datos.recargar}
                className="explorar-estado"
            />
        );
    }

    return (
        <ListaEventos
            eventos={datos.eventos}
            categorias={categorias}
            textosTarjeta={textosTarjeta}
            idioma={idioma}
            className="explorar-lista"
        />
    );
}
