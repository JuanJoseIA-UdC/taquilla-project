import { Fragment } from "react";
import Boton from "../ui/Boton.jsx";
import Campo from "../ui/Campo.jsx";
import Icono from "../ui/Icono.jsx";
import "./BuscadorHero.css";

export default function BuscadorHero({ textos, ciudad = "" }) {
    const campos = [
        {
            nombre: "que",
            icono: "buscar",
            etiqueta: textos.etiquetas.que,
            valor: "",
            placeholder: textos.placeholders.que,
        },
        {
            nombre: "donde",
            icono: "ubicacion",
            etiqueta: textos.etiquetas.donde,
            valor: ciudad || "—",
        },
        {
            nombre: "cuando",
            icono: "calendario",
            etiqueta: textos.etiquetas.cuando,
            valor: textos.placeholders.cuando,
        },
    ];

    const resumenMovil = ciudad
        ? textos.resumenMovil
              .replace("{ciudad}", () => ciudad)
              .replace("{fecha}", () => textos.placeholders.cuando)
        : textos.placeholders.cuando;

    return (
        <div className="buscador-hero">
            <div className="buscador-hero-web">
                {campos.map((campo, indice) => (
                    <Fragment key={campo.nombre}>
                        {indice > 0 && (
                            <span
                                className="buscador-hero-divisor"
                                aria-hidden="true"
                            />
                        )}

                        <div className="buscador-hero-campo">
                            <Icono
                                nombre={campo.icono}
                                className="buscador-hero-icono"
                            />

                            <Campo
                                etiqueta={campo.etiqueta}
                                value={campo.valor}
                                placeholder={campo.placeholder}
                                readOnly
                            />
                        </div>
                    </Fragment>
                ))}

                <Boton
                    variante="primario"
                    tamano="g"
                    aria-disabled="true"
                    className="buscador-hero-enviar"
                >
                    {textos.botones.buscar}
                </Boton>
            </div>

            <div className="buscador-hero-movil">
                <Icono nombre="buscar" className="buscador-hero-icono" />

                <div className="buscador-hero-movil-textos">
                    <span className="buscador-hero-movil-consulta">
                        {textos.placeholders.movil}
                    </span>

                    <span className="buscador-hero-movil-resumen">
                        {resumenMovil}
                    </span>
                </div>

                <span className="buscador-hero-filtros" aria-hidden="true">
                    <Icono nombre="filtros" className="buscador-hero-icono" />
                </span>
            </div>
        </div>
    );
}
