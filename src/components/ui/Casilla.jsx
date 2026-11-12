import { useId } from "react";
import Icono from "./Icono.jsx";
import "./Casilla.css";

export default function Casilla({
    children,
    detalle,
    id,
    disabled = false,
    className = "",
    ...props
}) {
    const idGenerado = useId();
    const entradaId = id ?? idGenerado;

    const clases = [
        "casilla",
        disabled ? "casilla--deshabilitada" : "",
        className,
    ]
        .filter(Boolean)
        .join(" ");

    return (
        <label className={clases} htmlFor={entradaId}>
            <span className="casilla-control">
                <input
                    {...props}
                    id={entradaId}
                    type="checkbox"
                    disabled={disabled}
                    className="casilla-entrada"
                />
                <Icono nombre="check" className="casilla-icono" />
            </span>

            <span className="casilla-etiqueta">{children}</span>

            {detalle !== undefined && detalle !== null && (
                <span className="casilla-detalle">{detalle}</span>
            )}
        </label>
    );
}
