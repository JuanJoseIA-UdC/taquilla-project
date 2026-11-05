import { Link } from "react-router";

export default function NoEncontrado({ textos }) {
    const contenido = textos.paginas.noEncontrado.contenido;

    return (
        <div>
            <h1>{contenido.titulo}</h1>
            <p>{contenido.texto}</p>
            <Link to="/">{contenido.botones.volverInicio}</Link>
        </div>
    );
}
