import "./SelectorIdioma.css";

const CLAVES_ETIQUETAS = { es: "codigoEs", en: "codigoEn" };

export default function SelectorIdioma({
    idioma,
    idiomas,
    onCambiarIdioma,
    etiqueta,
    textos,
}) {
    return (
        <div className="selector-idioma" role="group" aria-label={etiqueta}>
            {idiomas.map((codigo) => (
                <button
                    key={codigo}
                    type="button"
                    className="selector-idioma-opcion"
                    aria-pressed={idioma === codigo}
                    aria-label={`${textos[CLAVES_ETIQUETAS[codigo]]}: ${textos[codigo]}`}
                    onClick={() => {
                        if (idioma !== codigo) {
                            onCambiarIdioma(codigo);
                        }
                    }}
                >
                    {textos[CLAVES_ETIQUETAS[codigo]]}
                </button>
            ))}
        </div>
    );
}
