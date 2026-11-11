import { useId } from "react";
import Icono from "../ui/Icono.jsx";
import EstadoContenido from "../ui/EstadoContenido.jsx";
import "./FiltroCiudad.css";

export default function FiltroCiudad({
    datos,
    seleccionada,
    textos,
    estados,
    onCambiar,
}) {
    const selectorId = useId();

    const ciudadEncontrada = datos.ciudades.find(
        (ciudad) =>
            ciudad.nombre.trim().toLocaleLowerCase("es-CO") ===
            seleccionada.trim().toLocaleLowerCase("es-CO"),
    );

    const valor = ciudadEncontrada?.nombre ?? seleccionada;
    const faltaOpcionActual = Boolean(valor) && !ciudadEncontrada;

    return (
        <div className="filtro-ciudad">
            <label htmlFor={selectorId}>{textos.ciudad}</label>

            <div className="filtro-ciudad-control">
                <select
                    id={selectorId}
                    name="ciudad"
                    value={valor}
                    disabled={datos.cargando || datos.error}
                    onChange={(evento) => onCambiar(evento.target.value)}
                >
                    <option value="">{textos.todasCiudades}</option>

                    {faltaOpcionActual && (
                        <option value={valor} disabled>
                            {valor}
                        </option>
                    )}

                    {datos.ciudades.map((ciudad) => (
                        <option key={ciudad.nombre} value={ciudad.nombre}>
                            {ciudad.nombre}
                        </option>
                    ))}
                </select>

                <Icono nombre="flechaAbajo" className="filtro-ciudad-icono" />
            </div>

            {(datos.cargando || datos.error) && (
                <EstadoContenido
                    tipo={datos.error ? "error" : "cargando"}
                    textos={estados}
                    onReintentar={datos.recargar}
                    className="filtro-ciudad-estado"
                />
            )}
        </div>
    );
}
