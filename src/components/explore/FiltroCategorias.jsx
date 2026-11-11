import Casilla from "../ui/Casilla.jsx";
import Chip from "../ui/Chip.jsx";
import "./FiltroCategorias.css";

export default function FiltroCategorias({
    categorias,
    seleccionadas,
    titulo,
    idioma,
    variante = "casillas",
    onCambiar,
}) {
    const usarChips = variante === "chips";

    const formatoCantidad = new Intl.NumberFormat(
        idioma === "en" ? "en-US" : "es-CO",
    );

    function cambiarCategoria(id) {
        const nuevasCategorias = seleccionadas.includes(id)
            ? seleccionadas.filter((categoria) => categoria !== id)
            : [...seleccionadas, id];

        onCambiar(nuevasCategorias);
    }

    const clases = [
        "filtro-categorias",
        usarChips ? "filtro-categorias--chips" : "",
    ]
        .filter(Boolean)
        .join(" ");

    return (
        <fieldset className={clases}>
            <legend>{titulo}</legend>

            <div className="filtro-categorias-opciones">
                {categorias.map((categoria) => {
                    const seleccionada = seleccionadas.includes(categoria.id);

                    if (usarChips) {
                        return (
                            <Chip
                                key={categoria.id}
                                activo={seleccionada}
                                onClick={() => cambiarCategoria(categoria.id)}
                            >
                                {categoria.nombre}
                            </Chip>
                        );
                    }

                    return (
                        <Casilla
                            key={categoria.id}
                            name="categoria"
                            value={categoria.id}
                            checked={seleccionada}
                            onChange={() => cambiarCategoria(categoria.id)}
                            detalle={formatoCantidad.format(categoria.eventos)}
                        >
                            {categoria.nombre}
                        </Casilla>
                    );
                })}
            </div>
        </fieldset>
    );
}
