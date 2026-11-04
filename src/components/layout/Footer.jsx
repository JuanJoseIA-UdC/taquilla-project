import { useId } from "react";
import { Link } from "react-router";
import "./Footer.css";

export default function Footer({ textos, onAccesibilidad }) {
    const id = useId();
    const pie = textos?.footer;

    if (!pie) return null;

    const { explora, cuenta, legal } = pie.columnas;
    const derechos = pie.legal.derechos.replace(
        "{anio}",
        String(new Date().getFullYear()),
    );

    return (
        <footer className="footer">
            <div className="footer-interior">
                <div className="footer-principal">
                    <div className="footer-presentacion">
                        <Link
                            to="/"
                            className="footer-marca"
                            aria-label={textos.navbar.logo.aria}
                        >
                            <img
                                src="/logos/logo-inverso.svg"
                                alt=""
                                width="109"
                                height="32"
                            />
                        </Link>

                        <p className="footer-descripcion">{pie.lema}</p>
                    </div>

                    <div className="footer-columnas">
                        <nav
                            className="footer-columna"
                            aria-labelledby={`${id}-explora`}
                        >
                            <h2 id={`${id}-explora`}>{explora.titulo}</h2>
                            <ul>
                                <li>
                                    <Link to="/">{explora.enlaces.inicio}</Link>
                                </li>
                                <li>
                                    <Link to="/explorar">
                                        {explora.enlaces.explorar}
                                    </Link>
                                </li>
                            </ul>
                        </nav>

                        <nav
                            className="footer-columna"
                            aria-labelledby={`${id}-cuenta`}
                        >
                            <h2 id={`${id}-cuenta`}>{cuenta.titulo}</h2>
                            <ul>
                                <li>
                                    <Link to="/ingresar">
                                        {cuenta.enlaces.ingresar}
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/registro">
                                        {cuenta.enlaces.crearCuenta}
                                    </Link>
                                </li>
                            </ul>
                        </nav>

                        <nav
                            className="footer-columna"
                            aria-labelledby={`${id}-legal`}
                        >
                            <h2 id={`${id}-legal`}>{legal.titulo}</h2>
                            <ul>
                                <li>
                                    <Link to="/registro/terminos">
                                        {legal.enlaces.terminos}
                                    </Link>
                                </li>
                                <li>
                                    <button
                                        type="button"
                                        onClick={onAccesibilidad}
                                    >
                                        {legal.enlaces.accesibilidad}
                                    </button>
                                </li>
                            </ul>
                        </nav>
                    </div>
                </div>

                <div className="footer-creditos">
                    <p>{derechos}</p>
                    <p>{pie.legal.nota}</p>
                </div>
            </div>
        </footer>
    );
}
