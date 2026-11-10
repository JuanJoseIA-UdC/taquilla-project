import { useLocation } from "react-router";
import { useEventosExplorar } from "../hooks/useEventosExplorar.js";
import { useCategorias } from "../hooks/useCategorias.js";
import ListaEventos from "../components/events/ListaEventos.jsx";
import EstadoContenido from "../components/ui/EstadoContenido.jsx";

export default function Explorar({ textos, idioma }) {
    const { search } = useLocation();
    const datos = useEventosExplorar(search);
    const categorias = useCategorias();

    let tipoEstado = null;

    if (datos.error || categorias.error) {
        tipoEstado = "error";
    } else if (datos.cargando || categorias.cargando) {
        tipoEstado = "cargando";
    } else if (datos.eventos.length === 0) {
        tipoEstado = "vacio";
    }

    function reintentar() {
        if (datos.error) {
            datos.recargar();
        }

        if (categorias.error) {
            categorias.recargar();
        }
    }

    return (
        <section className="explorar" aria-labelledby="explorar-titulo">
            <h1 id="explorar-titulo">
                {textos.footer.columnas.explora.enlaces.explorar}
            </h1>

            {tipoEstado ? (
                <EstadoContenido
                    tipo={tipoEstado}
                    textos={textos.estados}
                    onReintentar={reintentar}
                    className="explorar-estado"
                />
            ) : (
                <ListaEventos
                    eventos={datos.eventos}
                    categorias={categorias.categorias}
                    textosTarjeta={textos.paginas.inicio.tarjeta}
                    idioma={idioma}
                    className="explorar-lista"
                />
            )}
        </section>
    );
}
