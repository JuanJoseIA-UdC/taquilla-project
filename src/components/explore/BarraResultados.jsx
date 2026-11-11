import { useId, useRef } from "react";
import Icono from "../ui/Icono.jsx";
import { obtenerFiltrosActivos } from "../../utils/filtrosActivos.js";
import "./BarraResultados.css";

const ORDENES = ["fecha", "precio", "popularidad"];

export default function BarraResultados({
    filtros,
    categorias,
    textos,
    idioma,
    total = null,
    onCambiarFiltros,
}) {
    const ordenId = useId();
    const listaRef = useRef(null);
    const ordenRef = useRef(null);

    const activos = obtenerFiltrosActivos(
        filtros,
        categorias,
        textos.filtros,
        idioma,
    );

    let resumen = "";

    if (total !== null) {
        const plantilla =
            total === 1
                ? textos.resultadosCorto.uno
                : textos.resultadosCorto.otro;

        const cantidad = new Intl.NumberFormat(
            idioma === "en" ? "en-US" : "es-CO",
        ).format(total);

        resumen = plantilla.replace("{cantidad}", cantidad);
    }

    function quitarFiltro(activo, indice) {
        const botones = listaRef.current.querySelectorAll("button");
        const siguiente =
            botones[indice + 1] ?? botones[indice - 1] ?? ordenRef.current;

        siguiente?.focus();
        onCambiarFiltros(activo.cambios);
    }

    return (
        <div className="barra-resultados">
            <ul
                ref={listaRef}
                className="barra-resultados-activos"
                aria-label={textos.filtros.activos}
            >
                {activos.map((activo, indice) => (
                    <li key={activo.id}>
                        <button
                            type="button"
                            className="barra-resultados-filtro"
                            aria-label={textos.filtros.quitar.replace(
                                "{filtro}",
                                activo.etiqueta,
                            )}
                            title={activo.etiqueta}
                            onClick={() => quitarFiltro(activo, indice)}
                        >
                            <span>{activo.etiqueta}</span>
                            <Icono
                                nombre="cerrar"
                                className="barra-resultados-quitar"
                            />
                        </button>
                    </li>
                ))}
            </ul>

            <div className="barra-resultados-controles">
                <p
                    className="barra-resultados-conteo"
                    role="status"
                    aria-atomic="true"
                >
                    {resumen}
                </p>

                <div className="barra-resultados-orden">
                    <label htmlFor={ordenId}>{textos.orden.etiqueta}</label>

                    <div className="barra-resultados-selector">
                        <select
                            ref={ordenRef}
                            id={ordenId}
                            name="orden"
                            value={filtros.orden}
                            onChange={(evento) =>
                                onCambiarFiltros({
                                    orden: evento.target.value,
                                })
                            }
                        >
                            {ORDENES.map((orden) => (
                                <option key={orden} value={orden}>
                                    {textos.orden.opciones[orden]}
                                </option>
                            ))}
                        </select>

                        <Icono
                            nombre="flechaAbajo"
                            className="barra-resultados-flecha"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
