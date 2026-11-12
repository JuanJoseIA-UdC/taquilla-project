import { obtenerPaginasVisibles } from "../../utils/paginacion.js";
import Icono from "./Icono.jsx";
import "./Paginacion.css";

export default function Paginacion({ pagina, paginas, textos, onCambiar }) {
    const elementos = obtenerPaginasVisibles(pagina, paginas);

    if (paginas <= 1 || elementos.length === 0) {
        return null;
    }

    const actual = Math.min(pagina, paginas);

    return (
        <nav className="paginacion" aria-label={textos.etiqueta}>
            <button
                type="button"
                className="paginacion-boton"
                aria-label={textos.anterior}
                disabled={actual === 1}
                onClick={() => onCambiar(actual - 1)}
            >
                <Icono nombre="chevronIzquierda" className="paginacion-icono" />
            </button>

            {elementos.map((elemento) => {
                if (typeof elemento === "string") {
                    return (
                        <span
                            key={elemento}
                            className="paginacion-separador"
                            aria-hidden="true"
                        >
                            …
                        </span>
                    );
                }

                const seleccionada = elemento === actual;

                return (
                    <button
                        key={elemento}
                        type="button"
                        className="paginacion-boton"
                        aria-label={(seleccionada
                            ? textos.paginaActual
                            : textos.irAPagina
                        ).replace("{numero}", String(elemento))}
                        aria-current={seleccionada ? "page" : undefined}
                        onClick={() => {
                            if (!seleccionada) {
                                onCambiar(elemento);
                            }
                        }}
                    >
                        {elemento}
                    </button>
                );
            })}

            <button
                type="button"
                className="paginacion-boton"
                aria-label={textos.siguiente}
                disabled={actual === paginas}
                onClick={() => onCambiar(actual + 1)}
            >
                <Icono nombre="chevronDerecha" className="paginacion-icono" />
            </button>
        </nav>
    );
}
