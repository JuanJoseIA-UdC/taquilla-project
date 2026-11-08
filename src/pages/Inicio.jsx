import HeroTaquilla from "../components/home/HeroTaquilla.jsx";
import EventoDestacadoHero from "../components/home/EventoDestacadoHero.jsx";
import { useEventosDestacados } from "../hooks/useEventosDestacados.js";

export default function Inicio({ textos, idioma }) {
    const destacados = useEventosDestacados();
    const hero = textos.paginas.inicio.hero;

    return (
        <HeroTaquilla textos={hero}>
            <EventoDestacadoHero
                datos={destacados}
                textos={hero.destacado}
                estados={textos.estados}
                idioma={idioma}
            />
        </HeroTaquilla>
    );
}
