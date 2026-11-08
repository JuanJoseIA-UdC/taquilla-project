import Etiqueta from "../ui/Etiqueta.jsx";
import "./HeroTaquilla.css";
import BuscadorHero from "./BuscadorHero.jsx";

export default function HeroTaquilla({ textos, children }) {
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
                </div>
                {children}
            </div>
        </section>
    );
}
