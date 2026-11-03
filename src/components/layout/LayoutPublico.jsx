import Navbar from "../Navbar.jsx";

export default function LayoutPublico({
    datos,
    idioma,
    cambiarIdioma,
    textoGrande,
    alternarTexto,
    children,
}) {
    const ingles = idioma === "en";

    return (
        <div className="layout-publico">
            <Navbar
                {...datos}
                idioma={idioma}
                cambiarIdioma={cambiarIdioma}
                textoGrande={textoGrande}
                alternarTexto={alternarTexto}
            />

            <main id="contenido" tabIndex={-1}>
                {datos.cargando ? (
                    <p role="status">{ingles ? "Loading…" : "Cargando…"}</p>
                ) : datos.error ? (
                    <div role="alert">
                        <p>
                            {ingles
                                ? "We could not load the interface."
                                : "No pudimos cargar la interfaz."}
                        </p>
                        <button type="button" onClick={datos.recargar}>
                            {ingles ? "Try again" : "Reintentar"}
                        </button>
                    </div>
                ) : (
                    children
                )}
            </main>
        </div>
    );
}
