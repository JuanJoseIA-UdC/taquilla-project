import { Link } from "react-router";
import Icono from "../ui/Icono.jsx";
import "./PortadaIngreso.css";

export default function PortadaIngreso({ textos }) {
    const { descubre, filtra, consulta } = textos.beneficios;

    return (
        <aside className="portada-ingreso">
            <Link to="/" className="portada-ingreso-marca">
                <img
                    src="/logos/logo-inverso.svg"
                    alt="Taquilla"
                    width="109"
                    height="32"
                />
            </Link>

            <div className="portada-ingreso-presentacion">
                <p className="portada-ingreso-lema titular-display">
                    {textos.lema}
                </p>
                <ul>
                    {[descubre, filtra, consulta].map((beneficio) => (
                        <li key={beneficio} className="cuerpo-g">
                            <span>
                                <Icono nombre="check" />
                            </span>
                            {beneficio}
                        </li>
                    ))}
                </ul>
            </div>
        </aside>
    );
}
