import { useId, useState } from "react";
import Chip from "../ui/Chip.jsx";
import Campo from "../ui/Campo.jsx";
import Boton from "../ui/Boton.jsx";
import "./FiltroFecha.css";

const OPCIONES_PERIODO = [
    { valor: "hoy", texto: "hoy" },
    { valor: "fin-de-semana", texto: "finDeSemana" },
    { valor: "mes", texto: "mes" },
];

export default function FiltroFecha({
    filtros,
    textos,
    textoAplicar,
    onCambiar,
}) {
    const formularioId = useId();
    const [abierto, setAbierto] = useState(false);

    const personalizado = Boolean(filtros.fechaDesde || filtros.fechaHasta);
    const mostrarFormulario = abierto || personalizado;

    function seleccionarPeriodo(periodo) {
        setAbierto(false);

        onCambiar({
            periodo: filtros.periodo === periodo ? "" : periodo,
            fechaDesde: "",
            fechaHasta: "",
        });
    }

    function aplicarFechas(evento) {
        evento.preventDefault();

        const formulario = new FormData(evento.currentTarget);

        onCambiar({
            periodo: "",
            fechaDesde: String(formulario.get("fechaDesde") ?? ""),
            fechaHasta: String(formulario.get("fechaHasta") ?? ""),
        });

        setAbierto(false);
    }

    return (
        <fieldset className="filtro-fecha">
            <legend>{textos.titulo}</legend>

            <div className="filtro-fecha-opciones">
                {OPCIONES_PERIODO.map((opcion) => (
                    <Chip
                        key={opcion.valor}
                        activo={
                            !personalizado && filtros.periodo === opcion.valor
                        }
                        onClick={() => seleccionarPeriodo(opcion.valor)}
                    >
                        {textos[opcion.texto]}
                    </Chip>
                ))}

                <Chip
                    activo={personalizado}
                    aria-expanded={mostrarFormulario}
                    aria-controls={mostrarFormulario ? formularioId : undefined}
                    onClick={() => setAbierto(true)}
                >
                    {textos.elegir}
                </Chip>
            </div>

            {mostrarFormulario && (
                <form
                    id={formularioId}
                    className="filtro-fecha-formulario"
                    onSubmit={aplicarFechas}
                >
                    <Campo
                        key={`desde-${filtros.fechaDesde}`}
                        etiqueta={textos.inicial}
                        type="date"
                        name="fechaDesde"
                        defaultValue={filtros.fechaDesde}
                        min="0001-01-01"
                        max="9999-12-31"
                        required
                    />

                    <Campo
                        key={`hasta-${filtros.fechaHasta}`}
                        etiqueta={textos.final}
                        type="date"
                        name="fechaHasta"
                        defaultValue={filtros.fechaHasta}
                        min="0001-01-01"
                        max="9999-12-31"
                        required
                    />

                    <Boton type="submit">{textoAplicar}</Boton>
                </form>
            )}
        </fieldset>
    );
}
