import { Link } from "react-router";
import Icono from "../ui/Icono.jsx";
import BuscadorExplorar from "./BuscadorExplorar.jsx";
import "./EncabezadoExplorar.css";

export default function EncabezadoExplorar({
    textos,
    total,
    idioma,
    consulta,
    onBuscar,
    panelFiltrosId,
    filtrosAbiertos,
    onAbrirFiltros,
}) {
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

            <div className="explorar-busqueda-movil">
                <BuscadorExplorar
                    consulta={consulta}
                    placeholder={
                        textos.paginas.inicio.hero.buscador.placeholders.movil
                    }
                    etiqueta={textos.navbar.buscador.aria}
                    onBuscar={onBuscar}
                />
                <button
                    type="button"
                    className="explorar-abrir-filtros"
                    aria-label={textos.paginas.explorar.filtros.titulo}
                    aria-haspopup="dialog"
                    aria-expanded={filtrosAbiertos}
                    aria-controls={panelFiltrosId}
                    onClick={onAbrirFiltros}
                >
                    <Icono nombre="filtros" />
                </button>
            </div>

            <p className="explorar-resumen" role="status" aria-atomic="true">
                {resumen}
            </p>
        </header>
    );
}
