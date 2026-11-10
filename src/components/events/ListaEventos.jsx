import TarjetaEvento from "./TarjetaEvento.jsx";
import { crearFormateadoresEvento } from "../../utils/formatoEventos.js";
import "./ListaEventos.css";

export default function ListaEventos({
    eventos,
    categorias,
    textosTarjeta,
    idioma,
    className = "",
}) {
    const { formatoFecha, formatoHora, formatoPrecio } =
        crearFormateadoresEvento(idioma);
    const nombresCategorias = new Map(
        categorias.map((categoria) => [categoria.id, categoria.nombre]),
    );
    const clases = ["lista-eventos", className].filter(Boolean).join(" ");

    return (
        <ul className={clases}>
            {eventos.map((evento) => {
                const fecha = new Date(evento.fecha);

                return (
                    <li key={evento.id}>
                        <TarjetaEvento
                            categoria={
                                nombresCategorias.get(evento.categoria) ??
                                evento.categoria
                            }
                            titulo={evento.titulo}
                            fecha={`${formatoFecha.format(fecha)} · ${formatoHora.format(fecha)}`}
                            fechaISO={evento.fecha}
                            lugar={`${evento.recinto.nombre}, ${evento.recinto.ciudad}`}
                            precio={formatoPrecio.format(evento.precioDesde)}
                            textoDesde={textosTarjeta.desde}
                            textoVerEvento={textosTarjeta.botones.verEvento}
                            href={`/eventos/${encodeURIComponent(evento.slug)}`}
                            afiche={evento.afiche}
                        />
                    </li>
                );
            })}
        </ul>
    );
}
