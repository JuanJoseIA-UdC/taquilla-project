import Buscar from "../../assets/iconos/search.svg?react";
import Idioma from "../../assets/iconos/globe.svg?react";
import Accesibilidad from "../../assets/iconos/person.svg?react";
import FlechaAbajo from "../../assets/iconos/chevd.svg?react";
import Menu from "../../assets/iconos/menu.svg?react";
import Cerrar from "../../assets/iconos/x.svg?react";
import Calendario from "../../assets/iconos/calendar.svg?react";
import Ubicacion from "../../assets/iconos/pin.svg?react";
import Filtros from "../../assets/iconos/sliders.svg?react";

const ICONOS = {
    buscar: Buscar,
    idioma: Idioma,
    accesibilidad: Accesibilidad,
    flechaAbajo: FlechaAbajo,
    menu: Menu,
    cerrar: Cerrar,
    calendario: Calendario,
    ubicacion: Ubicacion,
    filtros: Filtros,
};

export default function Icono({ nombre, className }) {
    const Componente = ICONOS[nombre];

    if (!Componente) return null;

    return (
        <Componente
            className={className}
            aria-hidden="true"
            focusable="false"
        />
    );
}
