import { useCallback, useId, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router";
import Icono from "./Icono.jsx";
import SelectorIdioma from "./language/SelectorIdioma.jsx";
import "./ui/Boton.css";
import "./Navbar.css";
import MenuMovil from "./MenuMovil.jsx";

export default function Navbar({
    textos,
    idioma,
    cambiarIdioma,
    textoGrande,
    alternarTexto,
}) {
    const [consulta, setConsulta] = useState("");
    const [menuAbierto, setMenuAbierto] = useState(false);
    const menuId = useId();
    const cerrarMenu = useCallback(() => {
        setMenuAbierto(false);
    }, []);
    const navigate = useNavigate();
    const nav = textos?.navbar;
    const ingles = idioma === "en";

    function buscar(evento) {
        evento.preventDefault();

        const termino = consulta.trim();
        const parametros = new URLSearchParams();

        if (termino) {
            parametros.set("q", termino);
        }

        navigate({
            pathname: "/explorar",
            search: parametros.toString(),
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

                    <Link to="/ingresar" className="navbar-movil-ingresar">
                        {nav.botones.ingresar}
                    </Link>

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
                            type="search"
                            value={consulta}
                            onChange={(evento) =>
                                setConsulta(evento.target.value)
                            }
                            placeholder={nav.buscador.placeholder}
                            aria-label={nav.buscador.aria}
                        />
                    </form>

                    <button
                        type="button"
                        className="navbar-accesibilidad"
                        aria-label={
                            ingles ? "Enlarge text" : "Aumentar tamaño de texto"
                        }
                        aria-pressed={textoGrande}
                        onClick={alternarTexto}
                    >
                        <Icono nombre="accesibilidad" />
                    </button>

                    <SelectorIdioma
                        idioma={idioma}
                        onCambiarIdioma={cambiarIdioma}
                        etiqueta={nav.aria.idioma}
                    />

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
                </div>
            </div>
            <MenuMovil
                id={menuId}
                abierto={menuAbierto}
                onCerrar={cerrarMenu}
                textos={textos}
                idioma={idioma}
                cambiarIdioma={cambiarIdioma}
                textoGrande={textoGrande}
                alternarTexto={alternarTexto}
            />
        </header>
    );
}
