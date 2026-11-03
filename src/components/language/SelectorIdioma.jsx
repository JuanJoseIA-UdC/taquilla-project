import "./SelectorIdioma.css";

export default function SelectorIdioma({ idioma, onCambiarIdioma, etiqueta }) {
    return (
        <button
            type="button"
            className="selector-idioma"
            aria-label={`${etiqueta}: ${idioma.toUpperCase()}`}
            onClick={() => onCambiarIdioma(idioma === "es" ? "en" : "es")}
        >
            <span
                className="selector-idioma-opcion"
                data-activa={idioma === "es"}
                aria-hidden="true"
            >
                ES
            </span>

            <span
                className="selector-idioma-opcion"
                data-activa={idioma === "en"}
                aria-hidden="true"
            >
                EN
            </span>
        </button>
    );
}
