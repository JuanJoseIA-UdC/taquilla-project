import { useEffect } from "react";
import { useDialogo } from "../../hooks/useDialogo.js";
import { useFiltrosMoviles } from "../../hooks/useFiltrosMoviles.js";
import Icono from "../ui/Icono.jsx";
import Boton from "../ui/Boton.jsx";
import EstadoContenido from "../ui/EstadoContenido.jsx";
import FiltroCategorias from "./FiltroCategorias.jsx";
import FiltroFecha from "./FiltroFecha.jsx";
import FiltroCiudad from "./FiltroCiudad.jsx";
import FiltroPrecio from "./FiltroPrecio.jsx";
import "./PanelFiltrosMovil.css";

function ContenidoPanel({
    tituloId,
    filtrosIniciales,
    categorias,
    ciudades,
    limitesPrecio,
    textos,
    idioma,
    onCerrar,
    onAplicar,
}) {
    const seleccion = useFiltrosMoviles(filtrosIniciales);
    const filtros = seleccion.filtros;
    const resultados = seleccion.resultados;
    const etiquetas = textos.paginas.explorar.filtros;

    let textoResultados = textos.estados.cargando.indicador;

    if (!resultados.cargando && !resultados.error) {
        const total = resultados.paginacion?.total ?? 0;
        const plantilla =
            total === 1
                ? etiquetas.botones.verResultado
                : etiquetas.botones.verResultados;

        const cantidad = new Intl.NumberFormat(
            idioma === "en" ? "en-US" : "es-CO",
        ).format(total);

        textoResultados = plantilla.replace("{cantidad}", cantidad);
    }

    return (
        <>
            <div className="panel-filtros-movil-encabezado">
                <h2 id={tituloId}>{etiquetas.titulo}</h2>

                <button
                    type="button"
                    className="panel-filtros-movil-limpiar"
                    onClick={seleccion.limpiar}
                >
                    {etiquetas.botones.limpiar}
                </button>

                <button
                    type="button"
                    className="panel-filtros-movil-cerrar"
                    aria-label={textos.general.aria.cerrarDialogo}
                    onClick={onCerrar}
                    autoFocus
                >
                    <Icono nombre="cerrar" />
                </button>
            </div>

            <div
                key={seleccion.revision}
                className="panel-filtros-movil-contenido"
            >
                {categorias.cargando || categorias.error ? (
                    <EstadoContenido
                        tipo={categorias.error ? "error" : "cargando"}
                        textos={textos.estados}
                        onReintentar={categorias.recargar}
                        className="panel-filtros-movil-estado"
                    />
                ) : (
                    <FiltroCategorias
                        categorias={categorias.categorias}
                        seleccionadas={filtros.categorias}
                        titulo={etiquetas.categoria}
                        idioma={idioma}
                        variante="chips"
                        onCambiar={(categoriasSeleccionadas) =>
                            seleccion.cambiar({
                                categorias: categoriasSeleccionadas,
                            })
                        }
                    />
                )}

                <FiltroFecha
                    filtros={filtros}
                    textos={etiquetas.fecha}
                    textoAplicar={textos.general.acciones.aplicar}
                    onCambiar={seleccion.cambiar}
                />

                <FiltroCiudad
                    datos={ciudades}
                    seleccionada={filtros.ciudad}
                    textos={etiquetas}
                    estados={textos.estados}
                    onCambiar={(ciudad) => seleccion.cambiar({ ciudad })}
                />

                <FiltroPrecio
                    datos={limitesPrecio}
                    filtros={filtros}
                    textos={etiquetas}
                    estados={textos.estados}
                    idioma={idioma}
                    onCambiar={seleccion.cambiar}
                />
            </div>

            <div className="panel-filtros-movil-pie">
                {resultados.error ? (
                    <EstadoContenido
                        tipo="error"
                        textos={textos.estados}
                        onReintentar={resultados.recargar}
                        className="panel-filtros-movil-estado"
                    />
                ) : (
                    <Boton
                        disabled={resultados.cargando}
                        onClick={() => onAplicar(filtros)}
                    >
                        {textoResultados}
                    </Boton>
                )}
            </div>
        </>
    );
}

export default function PanelFiltrosMovil({ id, abierto, onCerrar, ...props }) {
    const dialogoRef = useDialogo(abierto);
    const tituloId = `${id}-titulo`;

    useEffect(() => {
        if (!abierto) return;

        const escritorio = window.matchMedia("(min-width: 1280px)");

        function comprobarAncho() {
            if (escritorio.matches) {
                onCerrar();
            }
        }

        comprobarAncho();
        escritorio.addEventListener("change", comprobarAncho);

        return () => {
            escritorio.removeEventListener("change", comprobarAncho);
        };
    }, [abierto, onCerrar]);

    return (
        <dialog
            ref={dialogoRef}
            id={id}
            className="panel-filtros-movil"
            aria-labelledby={tituloId}
            onCancel={(evento) => {
                evento.preventDefault();
                onCerrar();
            }}
        >
            {abierto && (
                <ContenidoPanel
                    {...props}
                    tituloId={tituloId}
                    onCerrar={onCerrar}
                />
            )}
        </dialog>
    );
}
