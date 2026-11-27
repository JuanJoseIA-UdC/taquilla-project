import { useEffect, useId, useRef, useState } from "react";
import AvatarUsuario from "../auth/AvatarUsuario.jsx";
import ResumenUsuario from "../auth/ResumenUsuario.jsx";
import "./MenuCuenta.css";

export default function MenuCuenta({ usuario, textos }) {
    const [abierto, setAbierto] = useState(false);
    const contenedorRef = useRef(null);
    const botonRef = useRef(null);
    const id = useId();
    const botonId = `${id}--boton`;
    const panelId = `${id}--panel`;

    const etiqueta = textos.menu.replace("{nombre}", () => usuario.nombre);

    useEffect(() => {
        if (!abierto) return;

        function cerrarDesdeFuera(evento) {
            if (!contenedorRef.current?.contains(evento.target)) {
                setAbierto(false);
            }
        }

        function cerrarConEscape(evento) {
            if (evento.key !== "Escape") return;

            evento.preventDefault();
            setAbierto(false);
            botonRef.current?.focus();
        }

        const escritorio = window.matchMedia("(min-width: 1280px)");

        function cerrarAlCambiarAncho(evento) {
            if (!evento.matches) {
                setAbierto(false);
            }
        }

        document.addEventListener("pointerdown", cerrarDesdeFuera);
        document.addEventListener("focusin", cerrarDesdeFuera);
        document.addEventListener("keydown", cerrarConEscape);
        escritorio.addEventListener("change", cerrarAlCambiarAncho);

        return () => {
            document.removeEventListener("pointerdown", cerrarDesdeFuera);
            document.removeEventListener("focusin", cerrarDesdeFuera);
            document.removeEventListener("keydown", cerrarConEscape);
            escritorio.removeEventListener("change", cerrarAlCambiarAncho);
        };
    }, [abierto]);

    return (
        <div className="menu-cuenta" ref={contenedorRef}>
            <button
                ref={botonRef}
                id={botonId}
                type="button"
                className="menu-cuenta-boton"
                aria-label={etiqueta}
                aria-expanded={abierto}
                aria-controls={panelId}
                onClick={() => setAbierto((valor) => !valor)}
            >
                <AvatarUsuario nombre={usuario.nombre} />
            </button>

            <div
                id={panelId}
                className="menu-cuenta-panel"
                role="region"
                aria-labelledby={botonId}
                hidden={!abierto}
            >
                <ResumenUsuario usuario={usuario} inverso />
            </div>
        </div>
    );
}
