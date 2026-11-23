import Etiqueta from "../ui/Etiqueta.jsx";
import "./ContenidoEvento.css";

export default function ContenidoEvento({ evento, nombreCategoria, textos }) {
    const { titulo, descripcion, artistas, edadMinima } = evento;
    const tieneEdad = Number.isInteger(edadMinima) && edadMinima >= 0;
    const textoEdad =
        edadMinima === 0
            ? textos.etiquetas.todoPublico
            : textos.etiquetas.edadMinima.replace("{edad}", edadMinima);

    return (
        <div className="contenido-evento">
            <header className="contenido-evento-encabezado">
                <div className="contenido-evento-etiquetas">
                    <Etiqueta tono="marca">{nombreCategoria}</Etiqueta>

                    {tieneEdad && (
                        <Etiqueta className="contenido-evento-edad">
                            {textoEdad}
                        </Etiqueta>
                    )}
                </div>

                <h1
                    id="detalle-evento-titulo"
                    className="contenido-evento-titulo"
                >
                    {titulo}
                </h1>

                {artistas?.length > 0 && (
                    <p className="contenido-evento-artistas">
                        {artistas.join(" · ")}
                    </p>
                )}
            </header>

            <section
                className="contenido-evento-descripcion"
                aria-labelledby="detalle-descripcion-titulo"
            >
                <h2 id="detalle-descripcion-titulo">
                    {textos.descripcion.titulo}
                </h2>
                <p>{descripcion}</p>
            </section>
        </div>
    );
}
