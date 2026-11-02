import "./Campo.css";
import { useId } from "react";

export default function Campo({ etiqueta, id, type = "text", ...props }) {
    const idGenerado = useId();
    const campoId = id ?? idGenerado;

    return (
        <div className="campo">
            <label className="campo-etiqueta" htmlFor={campoId}>
                {etiqueta}
            </label>
            <input
                {...props}
                id={campoId}
                type={type}
                className="campo-entrada"
            />
        </div>
    );
}
