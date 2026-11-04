import { useCallback, useState } from "react";
import { useAccesibilidad } from "../../hooks/useAccesibilidad.js";
import Navbar from "../Navbar.jsx";
import PanelAccesibilidad from "../accessibility/PanelAccesibilidad.jsx";
import Footer from "./Footer.jsx";
import "./LayoutPublico.css";

export default function LayoutPublico({
    datos,
    idioma,
    cambiarIdioma,
    children,
}) {
    const ingles = idioma === "en";
    const accesibilidad = useAccesibilidad();
    const [panelAbierto, setPanelAbierto] = useState(false);

    const abrirAccesibilidad = useCallback(() => {
        setPanelAbierto(true);
    }, []);

    const cerrarAccesibilidad = useCallback(() => {
        setPanelAbierto(false);
    }, []);

    return (
        <div className="layout-publico">
            <Navbar
                {...datos}
                idioma={idioma}
                cambiarIdioma={cambiarIdioma}
                onAbrirAccesibilidad={abrirAccesibilidad}
            />

            <main id="contenido" tabIndex={-1}>
                {datos.cargando ? (
                    <p role="status">{ingles ? "Loading…" : "Cargando…"}</p>
                ) : datos.error ? (
                    <div role="alert">
                        <p>
                            {ingles
                                ? "We could not load the interface."
                                : "No pudimos cargar la interfaz."}
                        </p>
                        <button type="button" onClick={datos.recargar}>
                            {ingles ? "Try again" : "Reintentar"}
                        </button>
                    </div>
                ) : (
                    children
                )}
            </main>

            <Footer
                textos={datos.textos}
                onAccesibilidad={abrirAccesibilidad}
            />

            {datos.textos && (
                <PanelAccesibilidad
                    abierto={panelAbierto}
                    onCerrar={cerrarAccesibilidad}
                    textos={datos.textos}
                    accesibilidad={accesibilidad}
                />
            )}
        </div>
    );
}
