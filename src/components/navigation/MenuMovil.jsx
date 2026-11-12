import { useEffect } from "react";
import { Link, NavLink } from "react-router";
import { useDialogo } from "../../hooks/useDialogo.js";
import Icono from "../ui/Icono.jsx";
import SelectorIdioma from "../language/SelectorIdioma.jsx";
import "../ui/Boton.css";
import "./MenuMovil.css";

export default function MenuMovil({
    id,
    abierto,
    onCerrar,
    textos,
    idioma,
    idiomas,
    cambiarIdioma,
    onAbrirAccesibilidad,
}) {
    const dialogoRef = useDialogo(abierto);
    const nav = textos.navbar;
    const menu = textos.menuMovil;

    useEffect(() => {
        if (!abierto) return;

        const escritorio = window.matchMedia("(min-width: 1280px)");

        function alCambiarAncho(evento) {
            if (evento.matches) {
                onCerrar();
            }
        }

        escritorio.addEventListener("change", alCambiarAncho);

        return () => {
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
            aria-label={menu.aria.titulo}
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

            <nav aria-label={menu.aria.navegacion}>
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
                        idiomas={idiomas}
                        onCambiarIdioma={cambiarIdioma}
                        etiqueta={nav.aria.idioma}
                        textos={textos.idioma}
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
