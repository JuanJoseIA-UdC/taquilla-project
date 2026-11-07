import HeroTaquilla from "../components/home/HeroTaquilla.jsx";

export default function Inicio({ textos }) {
    return <HeroTaquilla textos={textos.paginas.inicio.hero} />;
}
