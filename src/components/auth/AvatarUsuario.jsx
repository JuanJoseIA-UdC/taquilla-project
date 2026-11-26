import "./AvatarUsuario.css";

export default function AvatarUsuario({ nombre, inverso = false }) {
    const iniciales = nombre
        .trim()
        .split(/\s+/)
        .slice(0, 2)
        .map((parte) => Array.from(parte)[0])
        .join("")
        .toLocaleUpperCase();

    return (
        <span
            className={[
                "avatar-usuario",
                "cuerpo-p",
                inverso ? "avatar-usuario--inverso" : "",
            ]
                .filter(Boolean)
                .join(" ")}
            aria-hidden="true"
        >
            {iniciales}
        </span>
    );
}
