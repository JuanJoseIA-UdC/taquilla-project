import "./Boton.css";

export default function Boton({
    children,
    type = "button",
    disabled = false,
    ...props
}) {
    return (
        <button
            {...props}
            type={type}
            disabled={disabled}
            className="boton boton--primario boton--m"
        >
            {children}
        </button>
    );
}
