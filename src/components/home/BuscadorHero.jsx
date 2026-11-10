import { Fragment, useState } from "react";
import { Link, useNavigate } from "react-router";
import Boton from "../ui/Boton.jsx";
import Campo from "../ui/Campo.jsx";
import Icono from "../ui/Icono.jsx";
import { crearRutaExplorar } from "../../utils/rutas.js";
import "./BuscadorHero.css";

export default function BuscadorHero({ textos, ciudad = "" }) {
    const [consulta, setConsulta] = useState("");
    const navigate = useNavigate();

    const rutaExplorar = crearRutaExplorar({
        q: consulta,
        ciudad,
    });

    function buscar(evento) {
        evento.preventDefault();
        navigate(rutaExplorar);
    }

    const campos = [
        {
            nombre: "que",
            icono: "buscar",
            etiqueta: textos.etiquetas.que,
            valor: consulta,
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
            <form
                className="buscador-hero-web"
                role="search"
                aria-label={textos.placeholders.movil}
                onSubmit={buscar}
            >
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
                                type={
                                    campo.nombre === "que" ? "search" : "text"
                                }
                                value={campo.valor}
                                placeholder={campo.placeholder}
                                onChange={
                                    campo.nombre === "que"
                                        ? (evento) =>
                                              setConsulta(evento.target.value)
                                        : undefined
                                }
                                readOnly={campo.nombre !== "que"}
                            />
                        </div>
                    </Fragment>
                ))}

                <Boton
                    variante="primario"
                    tamano="g"
                    type="submit"
                    className="buscador-hero-enviar"
                >
                    {textos.botones.buscar}
                </Boton>
            </form>

            <Link to={rutaExplorar} className="buscador-hero-movil">
                <Icono nombre="buscar" className="buscador-hero-icono" />

                <div className="buscador-hero-movil-textos">
                    <span className="buscador-hero-movil-consulta">
                        {consulta.trim() || textos.placeholders.movil}
                    </span>

                    <span className="buscador-hero-movil-resumen">
                        {resumenMovil}
                    </span>
                </div>

                <span className="buscador-hero-filtros" aria-hidden="true">
                    <Icono nombre="filtros" className="buscador-hero-icono" />
                </span>
            </Link>
        </div>
    );
}
