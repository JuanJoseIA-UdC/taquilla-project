import Etiqueta from "../ui/Etiqueta.jsx";
import "./HeroTaquilla.css";
import BuscadorHero from "./BuscadorHero.jsx";
import { BUSQUEDAS_POPULARES } from "../../data/busquedasPopulares.js";

export default function HeroTaquilla({ textos, idioma, children }) {
    const sugerencias = BUSQUEDAS_POPULARES[idioma] ?? BUSQUEDAS_POPULARES.es;
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
                    <BuscadorHero textos={textos.buscador} />
                    <div className="hero-taquilla-populares">
                        <span className="hero-taquilla-populares-etiqueta">
                            {textos.buscador.populares}
                        </span>

                        <ul className="hero-taquilla-populares-lista">
                            {sugerencias.map((sugerencia) => (
                                <li key={sugerencia}>{sugerencia}</li>
                            ))}
                        </ul>
                    </div>
                </div>
                {children}
            </div>
        </section>
    );
}
