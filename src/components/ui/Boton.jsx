import "./Boton.css";

export default function Boton({
    children,
    variante = "primario",
    tamano = "m",
    type = "button",
    disabled = false,
    className = "",
    ...props
}) {
    return (
        <button
            {...props}
            type={type}
            disabled={disabled}
            className={[
                "boton",
                `boton--${variante}`,
                `boton--${tamano}`,
                className,
            ]
                .filter(Boolean)
                .join(" ")}
        >
            {children}
        </button>
    );
}
