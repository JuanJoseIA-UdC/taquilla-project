import { Link } from "react-router";
import Icono from "../ui/Icono.jsx";
import "./PortadaEvento.css";

export default function PortadaEvento({ titulo, afiche, enlaces }) {
    return (
        <header className="portada-evento">
            <nav
                className="portada-evento-ruta"
                aria-labelledby="portada-evento-actual"
            >
                <ol>
                    <li>
                        <Link to="/">{enlaces.inicio}</Link>
                    </li>
                    <li>
                        <Icono nombre="chevronDerecha" />
                        <Link to="/explorar">{enlaces.explorar}</Link>
                    </li>
                    <li>
                        <Icono nombre="chevronDerecha" />
                        <span id="portada-evento-actual" aria-current="page">
                            {titulo}
                        </span>
                    </li>
                </ol>
            </nav>

            <div
                className="portada-evento-afiche"
                aria-hidden="true"
                style={{
                    "--afiche-inicio": afiche.color1,
                    "--afiche-fin": afiche.color2,
                }}
            />
        </header>
    );
}
