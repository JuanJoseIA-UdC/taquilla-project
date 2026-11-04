import { useEffect, useId, useRef } from "react";
import { Link } from "react-router";
import Icono from "../Icono.jsx";
import "./PanelAccesibilidad.css";

const OPCIONES = [
    "altoContraste",
    "reducirMovimiento",
    "subrayarEnlaces",
    "espaciadoLectura",
];

export default function PanelAccesibilidad({
    abierto,
    onCerrar,
    textos,
    accesibilidad,
}) {
    const dialogoRef = useRef(null);
    const id = useId();
    const t = textos.accesibilidad;

    const {
        preferencias,
        aumentarTexto,
        disminuirTexto,
        cambiarOpcion,
        restablecer,
        puedeAumentar,
        puedeDisminuir,
    } = accesibilidad;

    useEffect(() => {
        const dialogo = dialogoRef.current;

        if (abierto && !dialogo.open) {
            dialogo.showModal();
        } else if (!abierto && dialogo.open) {
            dialogo.close();
        }
    }, [abierto]);

    return (
        <dialog
            ref={dialogoRef}
            className="panel-accesibilidad"
            aria-labelledby={`${id}-titulo`}
            onCancel={(evento) => {
                evento.preventDefault();
                onCerrar();
            }}
        >
            <div className="panel-accesibilidad-cabecera">
                <h2 id={`${id}-titulo`}>{t.titulo}</h2>

                <button
                    type="button"
                    className="panel-accesibilidad-cerrar"
                    aria-label={textos.general.aria.cerrarDialogo}
                    onClick={onCerrar}
                    autoFocus
                >
                    <Icono nombre="cerrar" />
                </button>
            </div>

            <div
                className="panel-accesibilidad-tamano"
                role="group"
                aria-labelledby={`${id}-tamano`}
            >
                <p id={`${id}-tamano`} className="panel-accesibilidad-etiqueta">
                    {t.tamanoTexto}
                </p>

                <div className="panel-accesibilidad-control">
                    <button
                        type="button"
                        className="panel-accesibilidad-ajuste"
                        aria-label={t.aria.disminuirTexto}
                        disabled={!puedeDisminuir}
                        onClick={disminuirTexto}
                    >
                        <span aria-hidden="true">−</span>
                    </button>

                    <output
                        className="panel-accesibilidad-valor"
                        aria-live="polite"
                        aria-atomic="true"
                    >
                        <span aria-hidden="true">{t.muestraTamano}</span>
                        <span className="panel-accesibilidad-sr">
                            {t.tamanoTexto}: {preferencias.tamanoTexto}%
                        </span>
                    </output>

                    <button
                        type="button"
                        className="panel-accesibilidad-ajuste"
                        aria-label={t.aria.aumentarTexto}
                        disabled={!puedeAumentar}
                        onClick={aumentarTexto}
                    >
                        <span aria-hidden="true">+</span>
                    </button>
                </div>
            </div>

            <div className="panel-accesibilidad-opciones">
                {OPCIONES.map((opcion) => {
                    const nombreId = `${id}-${opcion}-nombre`;
                    const descripcionId = `${id}-${opcion}-descripcion`;

                    return (
                        <div
                            key={opcion}
                            className="panel-accesibilidad-opcion"
                        >
                            <div className="panel-accesibilidad-textos">
                                <p
                                    id={nombreId}
                                    className="panel-accesibilidad-etiqueta"
                                >
                                    {t[opcion].nombre}
                                </p>

                                <p
                                    id={descripcionId}
                                    className="panel-accesibilidad-descripcion"
                                >
                                    {t[opcion].descripcion}
                                </p>
                            </div>

                            <button
                                type="button"
                                role="switch"
                                className="panel-accesibilidad-interruptor"
                                aria-checked={preferencias[opcion]}
                                aria-labelledby={nombreId}
                                aria-describedby={descripcionId}
                                onClick={() =>
                                    cambiarOpcion(opcion, !preferencias[opcion])
                                }
                            >
                                <span
                                    className="panel-accesibilidad-perilla"
                                    aria-hidden="true"
                                />
                            </button>
                        </div>
                    );
                })}
            </div>

            <p className="panel-accesibilidad-nota">{t.nota}</p>

            <div className="panel-accesibilidad-pie">
                <Link to="/accesibilidad" onClick={onCerrar}>
                    {t.enlaces.declaracion}
                </Link>

                <button
                    type="button"
                    className="panel-accesibilidad-restablecer"
                    onClick={restablecer}
                >
                    {t.botones.restablecer}
                </button>
            </div>
        </dialog>
    );
}
