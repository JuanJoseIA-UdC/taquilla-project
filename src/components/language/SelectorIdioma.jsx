import "./SelectorIdioma.css";

const IDIOMAS = ["es", "en"];

export default function SelectorIdioma({ idioma, onCambiarIdioma, etiqueta }) {
    return (
        <div className="selector-idioma" role="group" aria-label={etiqueta}>
            {IDIOMAS.map((codigo) => (
                <button
                    key={codigo}
                    type="button"
                    className="selector-idioma-opcion"
                    aria-pressed={idioma === codigo}
                    onClick={() => {
                        if (idioma !== codigo) {
                            onCambiarIdioma(codigo);
                        }
                    }}
                >
                    {codigo.toUpperCase()}
                </button>
            ))}
        </div>
    );
}
