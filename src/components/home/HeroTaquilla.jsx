import { Link } from "react-router";
import Etiqueta from "../ui/Etiqueta.jsx";
import BuscadorHero from "./BuscadorHero.jsx";
import { BUSQUEDAS_POPULARES } from "../../data/busquedasPopulares.js";
import { crearRutaExplorar } from "../../utils/rutas.js";
import "./HeroTaquilla.css";

export default function HeroTaquilla({ textos, idioma, ciudad, children }) {
    return (
        <section className="hero-taquilla" aria-labelledby="inicio-titulo">
            <div className="hero-taquilla-interior">
                <div className="hero-taquilla-mensaje">
                    <Etiqueta tono="marca" className="hero-taquilla-temporada">
                        {textos.etiquetas.temporada}
                    </Etiqueta>

                    <h1 id="inicio-titulo" className="hero-taquilla-titulo">
                        {textos.titulo}
                    </h1>

                    <p className="hero-taquilla-descripcion">
                        {textos.subtitulo}
                    </p>

                    <BuscadorHero textos={textos.buscador} ciudad={ciudad} />

                    <div className="hero-taquilla-populares">
                        <span className="hero-taquilla-populares-etiqueta">
                            {textos.buscador.populares}
                        </span>

                        <ul className="hero-taquilla-populares-lista">
                            {BUSQUEDAS_POPULARES.map((sugerencia) => (
                                <li key={sugerencia.id}>
                                    <Link
                                        to={crearRutaExplorar({
                                            q: sugerencia.consulta,
                                            ciudad,
                                        })}
                                        className="hero-taquilla-popular"
                                    >
                                        {sugerencia.etiquetas[idioma] ??
                                            sugerencia.etiquetas.es}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                {children}
            </div>
        </section>
    );
}
