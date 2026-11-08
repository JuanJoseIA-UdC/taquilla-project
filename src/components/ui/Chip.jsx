import "./Chip.css";

export default function Chip({
    children,
    activo = false,
    className = "",
    ...props
}) {
    return (
        <button
            {...props}
            type="button"
            aria-pressed={activo}
            className={["chip", activo ? "chip--activo" : "", className]
                .filter(Boolean)
                .join(" ")}
        >
            {children}
        </button>
    );
}
