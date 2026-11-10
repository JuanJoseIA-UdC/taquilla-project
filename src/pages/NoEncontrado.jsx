import { Link } from "react-router";
import "../components/ui/Boton.css";
import "./NoEncontrado.css";

export default function NoEncontrado({ textos }) {
    const contenido = textos.paginas.noEncontrado.contenido;

    return (
        <section
            className="no-encontrado"
            aria-labelledby="no-encontrado-titulo"
        >
            <div className="no-encontrado-entrada" aria-hidden="true">
                <span className="no-encontrado-codigo">404</span>
                <span className="no-encontrado-perforacion" />
            </div>

            <div className="no-encontrado-contenido">
                <h1 id="no-encontrado-titulo" className="no-encontrado-titulo">
                    {contenido.titulo}
                </h1>

                <p className="no-encontrado-descripcion">{contenido.texto}</p>

                <div className="no-encontrado-acciones">
                    <Link to="/" className="boton boton--primario boton--g">
                        {contenido.botones.volverInicio}
                    </Link>

                    <Link
                        to="/explorar"
                        className="boton boton--secundario boton--g"
                    >
                        {textos.footer.columnas.explora.enlaces.explorar}
                    </Link>
                </div>
            </div>
        </section>
    );
}
