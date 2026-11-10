import { useId } from "react";
import Casilla from "../ui/Casilla.jsx";
import "./FiltrosExplorar.css";

export default function FiltrosExplorar({
    categorias,
    seleccionadas,
    textos,
    estados,
    onCambiarCategorias,
    onLimpiar,
    idioma,
}) {
    const tituloId = useId();
    const formatoCantidad = new Intl.NumberFormat(
        idioma === "en" ? "en-US" : "es-CO",
    );

    function cambiarCategoria(id, marcada) {
        const nuevasCategorias = marcada
            ? [...seleccionadas, id]
            : seleccionadas.filter((categoria) => categoria !== id);

        onCambiarCategorias(nuevasCategorias);
    }

    return (
        <aside className="filtros-explorar" aria-labelledby={tituloId}>
            <div className="filtros-explorar-encabezado">
                <h2 id={tituloId}>{textos.titulo}</h2>

                <button
                    type="button"
                    className="filtros-explorar-limpiar"
                    onClick={onLimpiar}
                >
                    {textos.botones.limpiar}
                </button>
            </div>

            <div className="filtros-explorar-grupo">
                {categorias.cargando ? (
                    <p className="filtros-explorar-cargando" role="status">
                        {estados.cargando.indicador}
                    </p>
                ) : categorias.error ? null : (
                    <fieldset className="filtros-explorar-categorias">
                        <legend>{textos.categoria}</legend>

                        <div className="filtros-explorar-opciones">
                            {categorias.categorias.map((categoria) => (
                                <Casilla
                                    key={categoria.id}
                                    name="categoria"
                                    value={categoria.id}
                                    checked={seleccionadas.includes(
                                        categoria.id,
                                    )}
                                    onChange={(evento) =>
                                        cambiarCategoria(
                                            categoria.id,
                                            evento.target.checked,
                                        )
                                    }
                                    detalle={formatoCantidad.format(
                                        categoria.eventos,
                                    )}
                                >
                                    {categoria.nombre}
                                </Casilla>
                            ))}
                        </div>
                    </fieldset>
                )}
            </div>
        </aside>
    );
}
