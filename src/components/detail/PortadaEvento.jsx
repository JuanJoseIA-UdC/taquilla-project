import { Link, useNavigate } from "react-router";
import Icono from "../ui/Icono.jsx";
import "./PortadaEvento.css";

export default function PortadaEvento({ titulo, afiche, enlaces, acciones }) {

    const navigate = useNavigate();

    function volver() {
        if (window.history.state?.idx > 0) {
            navigate(-1);
        } else {
            navigate("/explorar", { replace: true });
        }
    }

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
                style={{
                    "--afiche-inicio": afiche.color1,
                    "--afiche-fin": afiche.color2,
                }}
            >
                <div className="portada-evento-acciones">
                    <button
                        type="button"
                        className="portada-evento-boton"
                        aria-label={acciones.atras}
                        onClick={volver}
                    >
                        <Icono nombre="chevronIzquierda" />
                    </button>
                    <button
                        type="button"
                        className="portada-evento-boton"
                        aria-label={acciones.compartir}
                        disabled
                    >
                        <Icono nombre="compartir" />
                    </button>
                </div>
            </div>

        </header>
    );
}
