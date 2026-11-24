import Icono from "../ui/Icono.jsx";
import "./PortadaIngreso.css";

export default function PortadaIngreso({ textos }) {
    const { descubre, filtra, consulta } = textos.beneficios;

    return (
        <aside className="portada-ingreso">
            <img src="/logos/logo-inverso.svg" alt="Taquilla" width="109" height="32" />

            <div>
                <p className="portada-ingreso-lema">{textos.lema}</p>
                <ul>
                    {[descubre, filtra, consulta].map((beneficio) => (
                        <li key={beneficio}>
                            <span><Icono nombre="check" /></span>
                            {beneficio}
                        </li>
                    ))}
                </ul>
            </div>
        </aside>
    );
} 