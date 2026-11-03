import "./Etiqueta.css";

export default function Etiqueta({
    children,
    tono = "neutro",
    className = "",
    ...props
}) {
    const tienePunto = ["exito", "alerta", "error"].includes(tono);
    const clases = [
        "etiqueta",
        `etiqueta--${tono}`,
        tienePunto ? "etiqueta--con-punto" : "",
        className,
    ]
        .filter(Boolean)
        .join(" ");

    return (
        <span {...props} className={clases}>
            {tienePunto && (
                <span className="etiqueta-punto" aria-hidden="true" />
            )}
            <span className="etiqueta-texto">{children}</span>
        </span>
    );
}
