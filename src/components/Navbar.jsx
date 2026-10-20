import { useEffect, useRef, useState } from "react";
import "./Navbar.css";
import Icono from "./Icono.jsx";

const DESTINOS = {
    explorar: "#explorar",
    conciertos: "#conciertos",
    teatro: "#teatro",
    deportes: "#deportes",
    festivales: "#festivales"
};

const Navbar = ({ textos, cargando, error, recargar, idioma, cambiarIdioma, activo, onBuscar, textoGrande, alternarTexto, varianteMovil = "clara", }) => {

    const [abierto, setAbierto] = useState(false); // Saber si el toogle de mobile esta abierto
    const [busqueda, setBusqueda] = useState(""); //Sin valor a buscar
    const botonMenu = useRef(null);
    const botonBusqueda = useRef(null);
    const devolverFoco = useRef(null);
    const busquedaPendiente = useRef(false);
    const campoBusqueda = useRef(null);
    const nav = textos?.navbar;
    const ingles = idioma === "en"; //Toma el valor de la variable idioma solo si es ingles

    const abrir =
        textos?.menuMovil.abrir ?? (ingles ? "Open menu" : "Abrir menu");
    const cerrar =
        textos?.menuMovil.cerrar ?? (ingles ? "Close menu" : "Cerrar menu");
    const enlaces = Object.entries(nav?.enlaces ?? {}).filter(
        ([clave]) => DESTINOS[clave],
    );
   
    //Abrir y cerrar el menu toogle en vista mobile
    useEffect(() => {
        function cerrarConEscape(evento) {
            if (!abierto) return; //Unicamnete se registre el listener mientras el menu este abierto
            if (evento.key === "Escape" && abierto) {
                setAbierto(false); // Cierra el menu
                (devolverFoco.current ?? botonMenu.current)?.focus();
            }
        }
        document.addEventListener("keydown", cerrarConEscape); //Escucha las teclas en todo el documento
        return () => document.removeEventListener("keydown", cerrarConEscape);
    }, [abierto]);

    useEffect(() => {
        const escritorio = window.matchMedia("(min-width: 80rem)");
        function cerrarEnEscritorio(evento) {
            if (evento.matches) setAbierto(false);
        }
        escritorio.addEventListener("change", cerrarEnEscritorio);
        return () => escritorio.removeEventListener("change", cerrarEnEscritorio);
    }, []);

    useEffect(() => {
        if (!abierto) {
            busquedaPendiente.current = false;
        } else if (nav && busquedaPendiente.current) {
            campoBusqueda.current?.focus();
            busquedaPendiente.current = false;
        }
    }, [abierto, nav]);

    // Campo para buscar cualquier palabra o frase dentro de nuestro sitio
    function abrirBusqueda() {
        devolverFoco.current = botonBusqueda.current;
        busquedaPendiente.current = true;
        setAbierto(true);
        if (abierto && campoBusqueda.current) {
            campoBusqueda.current.focus();
            busquedaPendiente.current = false;
        }
    }

    function buscar(evento) {
        evento.preventDefault(); // cancelar la accion que el navegador haria por defecto antes ese evento
        const consulta = busqueda.trim();
        if (!consulta) return;
        onBuscar(consulta);
        setAbierto(false);
    }

    return (
        <header className="navbar" data-variante-movil={varianteMovil}>
            <nav
                className="navbar-interior"
                aria-label={nav?.aria.menu ?? "Navegación principal"}
            >
                <a
                    href="#inicio"
                    className="navbar-marca"
                    aria-label={nav?.logo.aria ?? "Inicio"}
                    onClick={() => setAbierto(false)}
                >
                    <picture>
                        <source
                            media="(width < 80rem)"
                            srcSet={varianteMovil === "oscura" ? "/logos/logo-inverso.svg" : "/logos/logo-normal.svg"}
                        />
                        <img
                            className="navbar-logo"
                            src="/logos/logo-normal.svg"
                            alt=""
                            width="109"
                            height="32"
                        />
                    </picture>

                </a>

                {/* Acciones del navbar movil */}
                <div className="navbar-movil-acciones">
                    <button
                        type="button"
                        ref={botonBusqueda}
                        className="navbar-icono"
                        aria-label={nav?.buscador.aria ?? "Buscar"}
                        aria-controls="navbar-panel"
                        aria-expanded={abierto}
                        onClick={abrirBusqueda}
                    >
                        <Icono nombre="buscar" className="navbar-buscar-movil-icono" />
                    </button>

                    <a
                        className="navbar-ingresar-movil"
                        href="#ingresar"
                        onClick={() => setAbierto(false)}
                    >
                        {nav?.botones.ingresar ?? (ingles ? "Log in" : "Ingresar")}
                    </a>

                    <button
                        type="button"
                        ref={botonMenu}
                        className="navbar-icono"
                        aria-label={abierto ? cerrar : abrir}
                        aria-expanded={abierto}
                        aria-controls="navbar-panel"
                        onClick={() => {
                            devolverFoco.current = botonMenu.current;
                            setAbierto((valor) => !valor);
                        }}
                    >
                        <Icono nombre={abierto ? "cerrar" : "menu"} />
                    </button>
                </div>

                <div id="navbar-panel" className={`navbar-panel${abierto ? " is-abierto" : ""}`} aria-busy={cargando}>
                    {cargando && <p className="navbar-estado" role="status">{ingles ? "Loading navigation…" : "Cargando navegación…"}</p>}
                    {error && <div className="navbar-estado" role="alert"><p>{ingles ? "Navigation could not be loaded." : "No pudimos cargar el menú."}</p><button type="button" onClick={recargar}>{ingles ? "Try again" : "Reintentar"}</button></div>}
                    {nav && <>
                        <ul className="navbar-enlaces">
                            {enlaces.map(([clave, etiqueta]) => (
                                <li key={clave}>
                                    <a
                                        href={DESTINOS[clave]}
                                        className={activo === "inicio" && clave === "explorar" ? "is-inicio" : undefined}
                                        aria-current={activo === clave ? "page" : undefined}
                                        onClick={() => setAbierto(false)}
                                    >
                                        {etiqueta}
                                    </a>
                                </li>
                            ))}
                        </ul>
                        <form className="navbar-buscador" role="search" aria-label={nav.buscador.aria} onSubmit={buscar}>
                            <button type="submit" aria-label={nav.buscador.aria}><Icono nombre="buscar" /></button>
                            <input ref={campoBusqueda} type="search" value={busqueda} onChange={(evento) => setBusqueda(evento.target.value)} placeholder={nav.buscador.placeholder} aria-label={nav.buscador.aria} required />
                        </form>
                    </>}
                    <div className="navbar-utilidades">
                        {nav && (<a className="navbar-vender" href="#venderEventos" onClick={() => setAbierto(false)}>{nav.enlaces.venderEventos}</a>)}
                        <label className="navbar-idioma"><Icono nombre="idioma" /><select value={idioma} onChange={(evento) => cambiarIdioma(evento.target.value)} aria-label={nav?.aria.idioma ?? "Cambiar idioma"}><option value="es">ES</option><option value="en">EN</option></select><Icono nombre="flechaAbajo" className="navbar-idioma-flecha"/></label>
                        <button className="navbar-icono navbar-accesibilidad" type="button" aria-label={ingles ? "Enlarge text" : "Aumentar texto"} aria-pressed={textoGrande} onClick={alternarTexto}><Icono nombre="accesibilidad" /></button>
                        {nav && (<a className="navbar-accion" href="#ingresar" onClick={() => setAbierto(false)}>{nav.botones.ingresar}</a>)}

                    </div>
                </div>
            </nav>
        </header>
    );
};

export default Navbar;


