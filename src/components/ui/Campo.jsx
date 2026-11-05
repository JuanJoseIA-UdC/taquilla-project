import { useId } from "react";
import "./Campo.css";

export default function Campo({
    etiqueta,
    id,
    type = "text",
    error,
    className = "",
    "aria-describedby": descripcion,
    "aria-invalid": invalido,
    ...props
}) {
    const idGenerado = useId();
    const campoId = id ?? idGenerado;
    const errorId = `${campoId}-error`;
    const tieneError = Boolean(error);
    const descripcionId =
        [descripcion, tieneError ? errorId : null].filter(Boolean).join(" ") ||
        undefined;

    return (
        <div className="campo">
            <label className="campo-etiqueta" htmlFor={campoId}>
                {etiqueta}
            </label>
            <input
                {...props}
                id={campoId}
                type={type}
                className={["campo-entrada", className]
                    .filter(Boolean)
                    .join(" ")}
                aria-invalid={tieneError ? true : invalido}
                aria-describedby={descripcionId}
            />
            {tieneError && (
                <p id={errorId} className="campo-error">
                    {error}
                </p>
            )}
        </div>
    );
}
