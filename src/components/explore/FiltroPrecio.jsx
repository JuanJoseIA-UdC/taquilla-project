import { useRef, useState } from "react";
import EstadoContenido from "../ui/EstadoContenido.jsx";
import { crearFormateadoresEvento } from "../../utils/formatoEventos.js";
import "./FiltroPrecio.css";

const TECLAS_AJUSTE = [
    "ArrowLeft",
    "ArrowRight",
    "ArrowUp",
    "ArrowDown",
    "Home",
    "End",
    "PageUp",
    "PageDown",
];

function RangoPrecio({
    minimo,
    maximo,
    desde,
    hasta,
    textos,
    formatoPrecio,
    onConfirmar,
}) {
    const [edicion, setEdicion] = useState(null);
    const pendiente = useRef(null);
    const interaccion = useRef(null);

    const clave = `${minimo}:${maximo}:${desde}:${hasta}`;
    const valores = edicion?.clave === clave ? edicion : { desde, hasta };
    const amplitud = maximo - minimo;
    const deshabilitado = amplitud === 0;

    const inicio = amplitud ? ((valores.desde - minimo) / amplitud) * 100 : 0;

    const final = amplitud ? ((valores.hasta - minimo) / amplitud) * 100 : 0;

    function confirmar() {
        interaccion.current = null;

        const cambio = pendiente.current;
        pendiente.current = null;

        if (!cambio || cambio.clave !== clave) {
            return;
        }

        if (cambio.desde === desde && cambio.hasta === hasta) {
            return;
        }

        onConfirmar({
            desde: cambio.desde,
            hasta: cambio.hasta,
        });
    }

    function cambiar(extremo, valor) {
        const cambio = {
            clave,
            desde:
                extremo === "desde"
                    ? Math.min(valor, valores.hasta)
                    : valores.desde,
            hasta:
                extremo === "hasta"
                    ? Math.max(valor, valores.desde)
                    : valores.hasta,
        };

        pendiente.current = cambio;
        setEdicion(cambio);

        // Permite aplicar cambios que no provengan de arrastre o teclado.
        if (interaccion.current === null) {
            confirmar();
        }
    }

    function cancelar() {
        pendiente.current = null;
        interaccion.current = null;
        setEdicion(null);
    }

    const eventosInteraccion = {
        onPointerDown(evento) {
            interaccion.current = "puntero";
            evento.currentTarget.setPointerCapture(evento.pointerId);
        },
        onPointerUp: confirmar,
        onPointerCancel: cancelar,
        onKeyDown(evento) {
            if (TECLAS_AJUSTE.includes(evento.key)) {
                interaccion.current = "teclado";
            }
        },
        onKeyUp(evento) {
            if (TECLAS_AJUSTE.includes(evento.key)) {
                confirmar();
            }
        },
        onBlur: confirmar,
    };

    return (
        <fieldset className="rango-precio" disabled={deshabilitado}>
            <legend>{textos.precio}</legend>

            <div className="rango-precio-barra">
                <div className="rango-precio-pista" aria-hidden="true" />

                <div className="rango-precio-recorrido" aria-hidden="true">
                    <div
                        className="rango-precio-tramo"
                        style={{
                            left: `${inicio}%`,
                            width: `${final - inicio}%`,
                        }}
                    />
                </div>

                <input
                    {...eventosInteraccion}
                    className={[
                        "rango-precio-entrada",
                        valores.desde === maximo
                            ? "rango-precio-entrada--encima"
                            : "",
                    ]
                        .filter(Boolean)
                        .join(" ")}
                    type="range"
                    name="precioMin"
                    min={minimo}
                    max={maximo}
                    step={1}
                    value={valores.desde}
                    aria-label={textos.precioMinimo}
                    aria-valuemax={valores.hasta}
                    aria-valuetext={formatoPrecio.format(valores.desde)}
                    onChange={(evento) =>
                        cambiar("desde", evento.target.valueAsNumber)
                    }
                />

                <input
                    {...eventosInteraccion}
                    className="rango-precio-entrada"
                    type="range"
                    name="precioMax"
                    min={minimo}
                    max={maximo}
                    step={1}
                    value={valores.hasta}
                    aria-label={textos.precioMaximo}
                    aria-valuemin={valores.desde}
                    aria-valuetext={formatoPrecio.format(valores.hasta)}
                    onChange={(evento) =>
                        cambiar("hasta", evento.target.valueAsNumber)
                    }
                />
            </div>

            <div className="rango-precio-valores" aria-hidden="true">
                <span>{formatoPrecio.format(valores.desde)}</span>
                <span>{formatoPrecio.format(valores.hasta)}</span>
            </div>
        </fieldset>
    );
}

export default function FiltroPrecio({
    datos,
    filtros,
    textos,
    estados,
    idioma,
    onCambiar,
}) {
    if (datos.cargando || datos.error) {
        return (
            <EstadoContenido
                tipo={datos.error ? "error" : "cargando"}
                textos={estados}
                onReintentar={datos.recargar}
                className="filtro-precio-estado"
            />
        );
    }

    if (!datos.limites?.hayEventos) {
        return (
            <EstadoContenido
                tipo="vacio"
                textos={estados}
                className="filtro-precio-estado"
            />
        );
    }

    const { formatoPrecio } = crearFormateadoresEvento(idioma);
    const minimo = datos.limites.minimo;

    // Conserva los límites de enlaces compartidos aunque el catálogo cambie.
    const maximo = Math.max(
        datos.limites.maximo,
        filtros.precioMin ?? minimo,
        filtros.precioMax ?? minimo,
    );

    const desde = filtros.precioMin ?? minimo;
    const hasta = filtros.precioMax ?? maximo;

    return (
        <RangoPrecio
            minimo={minimo}
            maximo={maximo}
            desde={desde}
            hasta={hasta}
            textos={textos}
            formatoPrecio={formatoPrecio}
            onConfirmar={(seleccion) =>
                onCambiar({
                    precioMin:
                        seleccion.desde === minimo ? null : seleccion.desde,
                    precioMax:
                        seleccion.hasta === maximo ? null : seleccion.hasta,
                })
            }
        />
    );
}
