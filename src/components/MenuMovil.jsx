import { useEffect, useRef } from "react";
import { Link, NavLink } from "react-router";
import Icono from "./Icono.jsx";
import SelectorIdioma from "./language/SelectorIdioma.jsx";
import "./ui/Boton.css";
import "./MenuMovil.css";

export default function MenuMovil({
    id,
    abierto,
    onCerrar,
    textos,
    idioma,
    cambiarIdioma,
    onAbrirAccesibilidad,
}) {
    const dialogoRef = useRef(null);
    const nav = textos.navbar;
    const menu = textos.menuMovil;
    const ingles = idioma === "en";

    useEffect(() => {
        const dialogo = dialogoRef.current;

        if (abierto && !dialogo.open) {
            dialogo.showModal();
        } else if (!abierto && dialogo.open) {
            dialogo.close();
        }
    }, [abierto]);

    useEffect(() => {
        if (!abierto) return;

        const overflowAnterior = document.body.style.overflow;
        document.body.style.overflow = "hidden";

        const escritorio = window.matchMedia("(min-width: 1280px)");

        function alCambiarAncho(evento) {
            if (evento.matches) {
                onCerrar();
            }
        }

        escritorio.addEventListener("change", alCambiarAncho);

        return () => {
            document.body.style.overflow = overflowAnterior;
            escritorio.removeEventListener("change", alCambiarAncho);
        };
    }, [abierto, onCerrar]);

    function cerrarDesdeVelo(evento) {
        if (evento.target !== evento.currentTarget) return;

        const limites = evento.currentTarget.getBoundingClientRect();
        const fuera =
            evento.clientX < limites.left ||
            evento.clientX > limites.right ||
            evento.clientY < limites.top ||
            evento.clientY > limites.bottom;

        if (fuera) {
            onCerrar();
        }
    }

    return (
        <dialog
            ref={dialogoRef}
            id={id}
            className="menu-movil"
            aria-label={ingles ? "Main menu" : "Menú principal"}
            onCancel={(evento) => {
                evento.preventDefault();
                onCerrar();
            }}
            onClick={cerrarDesdeVelo}
        >
            <div className="menu-movil-cabecera">
                <Link
                    to="/"
                    className="menu-movil-marca"
                    aria-label={nav.logo.aria}
                    onClick={onCerrar}
                >
                    <img
                        src="/logos/logo-normal.svg"
                        alt=""
                        width="109"
                        height="32"
                    />
                </Link>

                <button
                    type="button"
                    className="menu-movil-cerrar"
                    aria-label={menu.cerrar}
                    onClick={onCerrar}
                    autoFocus
                >
                    <Icono nombre="cerrar" />
                </button>
            </div>

            <nav
                aria-label={ingles ? "Main navigation" : "Navegación principal"}
            >
                <ul className="menu-movil-enlaces">
                    <li>
                        <NavLink to="/" end onClick={onCerrar}>
                            {nav.enlaces.inicio}
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/explorar" onClick={onCerrar}>
                            {nav.enlaces.explorar}
                        </NavLink>
                    </li>
                </ul>
            </nav>

            <div className="menu-movil-preferencias">
                <div className="menu-movil-fila">
                    <span>{menu.secciones.idioma}</span>

                    <SelectorIdioma
                        idioma={idioma}
                        onCambiarIdioma={cambiarIdioma}
                        etiqueta={nav.aria.idioma}
                    />
                </div>

                <div className="menu-movil-fila">
                    <span>{menu.secciones.accesibilidad}</span>

                    <button
                        type="button"
                        className="menu-movil-accesibilidad"
                        aria-label={nav.aria.accesibilidad}
                        aria-haspopup="dialog"
                        onClick={() => {
                            onCerrar();
                            onAbrirAccesibilidad();
                        }}
                    >
                        <Icono nombre="accesibilidad" />
                    </button>
                </div>
            </div>

            <div className="menu-movil-sesion">
                <Link
                    to="/ingresar"
                    className="boton boton--primario boton--m"
                    onClick={onCerrar}
                >
                    {nav.botones.ingresar}
                </Link>

                <Link
                    to="/registro"
                    className="boton boton--secundario boton--m"
                    onClick={onCerrar}
                >
                    {nav.botones.crearCuenta}
                </Link>
            </div>
        </dialog>
    );
}
