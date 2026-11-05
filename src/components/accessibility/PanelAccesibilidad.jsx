import { useId } from "react";
import { Link } from "react-router";
import { OPCIONES_ACCESIBILIDAD } from "../../config/accesibilidad.js";
import { useDialogo } from "../../hooks/useDialogo.js";
import Icono from "../ui/Icono.jsx";
import "./PanelAccesibilidad.css";

export default function PanelAccesibilidad({
    abierto,
    onCerrar,
    textos,
    accesibilidad,
}) {
    const dialogoRef = useDialogo(abierto);
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
                {OPCIONES_ACCESIBILIDAD.map((opcion) => {
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
