import Icono from "./Icono.jsx";
import "./Chip.css";

export default function Chip({ icono = "filtros", className = "" }) {
    return (
        <span
            className={["chip", className].filter(Boolean).join(" ")}
            aria-hidden="true"
        >
            <Icono nombre={icono} className="chip-icono" />
        </span>
    );
}
