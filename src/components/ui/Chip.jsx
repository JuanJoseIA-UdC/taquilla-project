import { Link } from "react-router";
import "./Chip.css";

export default function Chip({
    children,
    activo = false,
    className = "",
    to,
    ...props
}) {
    const clases = ["chip", activo ? "chip--activo" : "", className]
        .filter(Boolean)
        .join(" ");

    if (to !== undefined) {
        return (
            <Link {...props} to={to} className={clases}>
                {children}
            </Link>
        );
    }

    return (
        <button
            {...props}
            type="button"
            aria-pressed={activo}
            className={clases}
        >
            {children}
        </button>
    );
}
