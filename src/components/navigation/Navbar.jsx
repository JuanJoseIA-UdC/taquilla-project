import { useCallback, useEffect, useId, useRef, useState } from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router";
import { crearRutaExplorar, leerFiltrosExplorar } from "../../utils/rutas.js";
import SelectorIdioma from "../language/SelectorIdioma.jsx";
import "../ui/Boton.css";
import Icono from "../ui/Icono.jsx";
import MenuCuenta from "./MenuCuenta.jsx";
import MenuMovil from "./MenuMovil.jsx";
import "./Navbar.css";

export default function Navbar({
    textos,
    idioma,
    idiomas,
    cambiarIdioma,
    onAbrirAccesibilidad,
    usuario,
    onCerrarSesion,
    cerrandoSesion,
    errorCierreSesion,
}) {
    const campoBusquedaRef = useRef(null);
    const [menuAbierto, setMenuAbierto] = useState(false);
    const menuId = useId();
    const cerrarMenu = useCallback(() => {
        setMenuAbierto(false);
    }, []);
    const navigate = useNavigate();
    const nav = textos?.navbar;
    const { pathname, search, key: claveUbicacion } = useLocation();

    const enExplorar = /^\/explorar\/?$/i.test(pathname);
    const filtrosActuales = enExplorar ? leerFiltrosExplorar(search) : {};
    const consultaURL = filtrosActuales.q ?? "";

    useEffect(() => {
        if (campoBusquedaRef.current) {
            campoBusquedaRef.current.value = consultaURL;
        }
    }, [consultaURL, claveUbicacion]);

    function buscar(evento) {
        evento.preventDefault();

        const formulario = new FormData(evento.currentTarget);
        const q = String(formulario.get("q") ?? "").trim();

        campoBusquedaRef.current.value = q;

        navigate(
            crearRutaExplorar({
                ...filtrosActuales,
                q,
                pagina: 1,
            }),
        );
    }

    async function cerrarSesionDesdeMenu() {
        const cerrada = await onCerrarSesion();

        if (!cerrada) return;

        cerrarMenu();

        requestAnimationFrame(() => {
            document.getElementById("contenido")?.focus();
        });
    }

    if (!nav) return null;

    return (
        <header className="navbar">
            <div className="navbar-interior">
                <div className="navbar-principal">
                    <Link
                        to="/"
                        className="navbar-marca"
                        aria-label={nav.logo.aria}
                    >
                        <img
                            src="/logos/logo-normal.svg"
                            alt=""
                            width="109"
                            height="32"
                        />
                    </Link>

                    <nav className="navbar-navegacion">
                        <ul className="navbar-enlaces">
                            <li>
                                <NavLink to="/" end>
                                    {nav.enlaces.inicio}
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/explorar">
                                    {nav.enlaces.explorar}
                                </NavLink>
                            </li>
                        </ul>
                    </nav>
                </div>

                <div className="navbar-movil-acciones">
                    <Link
                        to="/explorar"
                        className="navbar-movil-icono"
                        aria-label={nav.buscador.aria}
                    >
                        <Icono nombre="buscar" />
                    </Link>

                    {!usuario && (
                        <Link to="/ingresar" className="navbar-movil-ingresar">
                            {nav.botones.ingresar}
                        </Link>
                    )}

                    <button
                        type="button"
                        className="navbar-movil-icono"
                        aria-label={textos.menuMovil.abrir}
                        aria-expanded={menuAbierto}
                        aria-controls={menuId}
                        aria-haspopup="dialog"
                        onClick={() => setMenuAbierto(true)}
                    >
                        <Icono
                            nombre="menu"
                            className="navbar-movil-menu-icono"
                        />
                    </button>
                </div>

                <div className="navbar-utilidades">
                    <form
                        className="navbar-buscador"
                        role="search"
                        aria-label={nav.buscador.aria}
                        onSubmit={buscar}
                    >
                        <button type="submit" aria-label={nav.buscador.aria}>
                            <Icono nombre="buscar" />
                        </button>

                        <input
                            ref={campoBusquedaRef}
                            type="search"
                            name="q"
                            defaultValue={consultaURL}
                            placeholder={nav.buscador.placeholder}
                            aria-label={nav.buscador.aria}
                            enterKeyHint="search"
                        />
                    </form>

                    <button
                        type="button"
                        className="navbar-accesibilidad"
                        aria-label={nav.aria.accesibilidad}
                        aria-haspopup="dialog"
                        onClick={onAbrirAccesibilidad}
                    >
                        <Icono nombre="accesibilidad" />
                    </button>

                    <SelectorIdioma
                        idioma={idioma}
                        idiomas={idiomas}
                        onCambiarIdioma={cambiarIdioma}
                        etiqueta={nav.aria.idioma}
                        textos={textos.idioma}
                    />

                    {usuario ? (
                        <MenuCuenta
                            key={claveUbicacion}
                            usuario={usuario}
                            textos={nav.usuario}
                            estados={textos.estados}
                            onCerrarSesion={cerrarSesionDesdeMenu}
                            cerrandoSesion={cerrandoSesion}
                            errorCierreSesion={errorCierreSesion}
                        />
                    ) : (
                        <>
                            <Link
                                to="/ingresar"
                                className="boton boton--secundario boton--m navbar-cuenta"
                            >
                                {nav.botones.ingresar}
                            </Link>

                            <Link
                                to="/registro"
                                className="boton boton--primario boton--m navbar-cuenta"
                            >
                                {nav.botones.crearCuenta}
                            </Link>
                        </>
                    )}
                </div>
            </div>
            <MenuMovil
                id={menuId}
                abierto={menuAbierto}
                onCerrar={cerrarMenu}
                textos={textos}
                idioma={idioma}
                idiomas={idiomas}
                cambiarIdioma={cambiarIdioma}
                onAbrirAccesibilidad={onAbrirAccesibilidad}
                usuario={usuario}
                onCerrarSesion={cerrarSesionDesdeMenu}
                cerrandoSesion={cerrandoSesion}
                errorCierreSesion={errorCierreSesion}
            />
        </header>
    );
}
