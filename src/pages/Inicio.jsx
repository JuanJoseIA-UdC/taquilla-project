import HeroTaquilla from "../components/home/HeroTaquilla.jsx";
import EventoDestacadoHero from "../components/home/EventoDestacadoHero.jsx";
import CategoriasInicio from "../components/home/CategoriasInicio.jsx";
import { useEventosDestacados } from "../hooks/useEventosDestacados.js";
import { useCategorias } from "../hooks/useCategorias.js";
import DestacadosInicio from "../components/home/DestacadosInicio.jsx";

export default function Inicio({ textos, idioma }) {
    const destacados = useEventosDestacados();
    const categorias = useCategorias();
    const inicio = textos.paginas.inicio;

    return (
        <>
            <HeroTaquilla textos={inicio.hero} idioma={idioma}>
                <EventoDestacadoHero
                    datos={destacados}
                    textos={inicio.hero.destacado}
                    estados={textos.estados}
                    idioma={idioma}
                />
            </HeroTaquilla>

            <CategoriasInicio
                datos={categorias}
                textos={inicio.categorias}
                textoTodos={inicio.filtrosMovil.todos}
                estados={textos.estados}
            />
            <DestacadosInicio
                datos={destacados}
                categorias={categorias.categorias}
                textos={inicio.destacados}
                tituloMovil={inicio.filtrosMovil.destacados}
                textosTarjeta={inicio.tarjeta}
                estados={textos.estados}
                idioma={idioma}
            />
        </>
    );
}
