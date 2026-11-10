import "./ContenidoExplorar.css";

export default function ContenidoExplorar({ filtros = null, children }) {
    return (
        <div className="explorar-contenido">
            {filtros && (
                <div className="explorar-contenido-filtros">{filtros}</div>
            )}

            <div className="explorar-resultados">{children}</div>
        </div>
    );
}
