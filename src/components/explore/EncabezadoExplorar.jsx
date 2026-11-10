import { Link } from "react-router";
import Icono from "../ui/Icono.jsx";
import "./EncabezadoExplorar.css";

export default function EncabezadoExplorar({ textos, total, idioma }) {
    const resultados = textos.paginas.explorar.resultados;

    let resumen = "";

    if (total !== null) {
        const plantilla = total === 1 ? resultados.uno : resultados.otro;
        const cantidad = new Intl.NumberFormat(
            idioma === "en" ? "en-US" : "es-CO",
        ).format(total);

        resumen = plantilla.replace("{cantidad}", cantidad);
    }

    return (
        <header className="explorar-encabezado">
            <nav
                className="explorar-ruta"
                aria-labelledby="explorar-ruta-actual"
            >
                <ol>
                    <li>
                        <Link to="/">{textos.navbar.enlaces.inicio}</Link>
                    </li>

                    <li>
                        <Icono
                            nombre="chevronDerecha"
                            className="explorar-ruta-icono"
                        />
                        <span id="explorar-ruta-actual" aria-current="page">
                            {textos.navbar.enlaces.explorar}
                        </span>
                    </li>
                </ol>
            </nav>

            <h1 id="explorar-titulo" className="explorar-titulo">
                {textos.footer.columnas.explora.enlaces.explorar}
            </h1>

            <p className="explorar-resumen" role="status" aria-atomic="true">
                {resumen}
            </p>
        </header>
    );
}
