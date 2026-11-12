import { useEffect, useId, useState } from "react";
import { useLocation, useNavigate } from "react-router";
import { useEventosExplorar } from "../hooks/useEventosExplorar.js";
import { useCategorias } from "../hooks/useCategorias.js";
import EncabezadoExplorar from "../components/explore/EncabezadoExplorar.jsx";
import ContenidoExplorar from "../components/explore/ContenidoExplorar.jsx";
import ResultadosExplorar from "../components/explore/ResultadosExplorar.jsx";
import FiltrosExplorar from "../components/explore/FiltrosExplorar.jsx";
import { crearRutaExplorar } from "../utils/rutas.js";
import { useCiudades } from "../hooks/useCiudades.js";
import { useLimitesPrecio } from "../hooks/useLimitesPrecio.js";
import PanelFiltrosMovil from "../components/explore/PanelFiltrosMovil.jsx";

export default function Explorar({ textos, idioma }) {
    const { search, key: claveUbicacion } = useLocation();
    const navigate = useNavigate();
    const datos = useEventosExplorar(search);
    const categorias = useCategorias();
    const ciudades = useCiudades();
    const limitesPrecio = useLimitesPrecio();
    const rutaCorregida =
        datos.paginacion && datos.filtros.pagina !== datos.paginacion.pagina
            ? crearRutaExplorar({
                  ...datos.filtros,
                  pagina: datos.paginacion.pagina,
              })
            : null;

    useEffect(() => {
        if (rutaCorregida) {
            navigate(rutaCorregida, { replace: true });
        }
    }, [rutaCorregida, navigate]);

    function cambiarPagina(pagina) {
        navigate(
            crearRutaExplorar({
                ...datos.filtros,
                pagina,
            }),
        );
    }

    function cambiarFiltros(cambios) {
        navigate(
            crearRutaExplorar({
                ...datos.filtros,
                ...cambios,
                pagina: 1,
            }),
        );
    }

    function cambiarCategorias(seleccionadas) {
        cambiarFiltros({ categorias: seleccionadas });
    }

    function cambiarCiudad(ciudad) {
        cambiarFiltros({ ciudad });
    }

    function limpiarFiltros() {
        navigate(
            crearRutaExplorar({
                orden: datos.filtros.orden,
            }),
        );
    }

    function reintentar() {
        if (datos.error) {
            datos.recargar();
        }

        if (categorias.error) {
            categorias.recargar();
        }
    }

    function buscarEventos(q) {
        cambiarFiltros({ q });
    }

    const panelFiltrosId = useId();
    const [aperturaFiltros, setAperturaFiltros] = useState(null);

    if (aperturaFiltros !== null && aperturaFiltros.clave !== claveUbicacion) {
        setAperturaFiltros(null);
    }

    const filtrosAbiertos = aperturaFiltros?.clave === claveUbicacion;

    function abrirFiltros() {
        setAperturaFiltros({
            clave: claveUbicacion,
            filtros: datos.filtros,
        });
    }

    function cerrarFiltros() {
        setAperturaFiltros(null);
    }

    function aplicarFiltrosMoviles(filtros) {
        cambiarFiltros(filtros);
        cerrarFiltros();
    }

    const resultados = {
        eventos: datos.eventos,
        paginacion: datos.paginacion,
        cargando: datos.cargando || categorias.cargando,
        error: datos.error || categorias.error,
        recargar: reintentar,
    };

    const total =
        resultados.cargando || resultados.error
            ? null
            : (datos.paginacion?.total ?? null);

    return (
        <section aria-labelledby="explorar-titulo">
            <EncabezadoExplorar
                textos={textos}
                total={total}
                idioma={idioma}
                consulta={datos.filtros.q}
                onBuscar={buscarEventos}
                panelFiltrosId={panelFiltrosId}
                filtrosAbiertos={filtrosAbiertos}
                onAbrirFiltros={abrirFiltros}
            />

            <ContenidoExplorar
                filtros={
                    <FiltrosExplorar
                        categorias={categorias}
                        seleccionadas={datos.filtros.categorias}
                        textos={textos.paginas.explorar.filtros}
                        estados={textos.estados}
                        onCambiarCategorias={cambiarCategorias}
                        onLimpiar={limpiarFiltros}
                        idioma={idioma}
                        filtros={datos.filtros}
                        textoAplicar={textos.general.acciones.aplicar}
                        onCambiarFecha={cambiarFiltros}
                        ciudades={ciudades}
                        onCambiarCiudad={cambiarCiudad}
                        limitesPrecio={limitesPrecio}
                        onCambiarPrecio={cambiarFiltros}
                    />
                }
            >
                <ResultadosExplorar
                    datos={resultados}
                    categorias={categorias.categorias}
                    textosTarjeta={textos.paginas.inicio.tarjeta}
                    estados={textos.estados}
                    idioma={idioma}
                    filtros={datos.filtros}
                    textos={textos.paginas.explorar}
                    onCambiarFiltros={cambiarFiltros}
                    onCambiarPagina={cambiarPagina}
                />
            </ContenidoExplorar>

            <PanelFiltrosMovil
                id={panelFiltrosId}
                abierto={filtrosAbiertos}
                onCerrar={cerrarFiltros}
                onAplicar={aplicarFiltrosMoviles}
                filtrosIniciales={aperturaFiltros?.filtros ?? datos.filtros}
                categorias={categorias}
                ciudades={ciudades}
                limitesPrecio={limitesPrecio}
                textos={textos}
                idioma={idioma}
            />
        </section>
    );
}
