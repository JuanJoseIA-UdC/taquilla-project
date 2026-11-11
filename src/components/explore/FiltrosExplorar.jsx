import { useId } from "react";
import Casilla from "../ui/Casilla.jsx";
import FiltroFecha from "./FiltroFecha.jsx";
import FiltroCiudad from "./FiltroCiudad.jsx";
import FiltroPrecio from "./FiltroPrecio.jsx";
import "./FiltrosExplorar.css";

export default function FiltrosExplorar({
    categorias,
    seleccionadas,
    textos,
    estados,
    onCambiarCategorias,
    onLimpiar,
    idioma,
    filtros,
    textoAplicar,
    onCambiarFecha,
    ciudades,
    onCambiarCiudad,
    limitesPrecio,
    onCambiarPrecio,
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
            <div className="filtros-explorar-grupo">
                <FiltroFecha
                    filtros={filtros}
                    textos={textos.fecha}
                    textoAplicar={textoAplicar}
                    onCambiar={onCambiarFecha}
                />
            </div>
            <div className="filtros-explorar-grupo">
                <FiltroCiudad
                    datos={ciudades}
                    seleccionada={filtros.ciudad}
                    textos={textos}
                    estados={estados}
                    onCambiar={onCambiarCiudad}
                />
            </div>
            <div className="filtros-explorar-grupo">
                <FiltroPrecio
                    datos={limitesPrecio}
                    filtros={filtros}
                    textos={textos}
                    estados={estados}
                    idioma={idioma}
                    onCambiar={onCambiarPrecio}
                />
            </div>
        </aside>
    );
}
