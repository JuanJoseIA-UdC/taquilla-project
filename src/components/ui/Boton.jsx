import "./Boton.css";

export default function Boton({
    children,
    variante = "primario",
    tamano = "m",
    type = "button",
    disabled = false,
    ...props
}) {
    return (
        <button
            {...props}
            type={type}
            disabled={disabled}
            className={`boton boton--${variante} boton--${tamano}`}
        >
            {children}
        </button>
    );
}
