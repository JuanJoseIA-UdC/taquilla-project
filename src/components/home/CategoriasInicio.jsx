import { Link } from "react-router";
import Boton from "../ui/Boton.jsx";
import Chip from "../ui/Chip.jsx";
import Icono from "../ui/Icono.jsx";
import "./CategoriasInicio.css";

const ICONOS_CATEGORIAS = {
    conciertos: "musica",
    teatro: "estrella",
    deportes: "trofeo",
    festivales: "bandera",
    comedia: "sonrisa",
    familiares: "personas",
};

function rutaCategoria(id) {
    const parametros = new URLSearchParams({ categoria: id });
    return `/explorar?${parametros.toString()}`;
}

function presentarCantidad(cantidad, textos) {
    const plantilla = cantidad === 1 ? textos.eventos.uno : textos.eventos.otro;

    return plantilla.replace("{cantidad}", () => String(cantidad));
}

export default function CategoriasInicio({
    datos,
    textos,
    textoTodos,
    estados,
}) {
    let contenido;

    if (datos.cargando) {
        contenido = (
            <p className="categorias-inicio-estado" role="status">
                {estados.cargando.indicador}
            </p>
        );
    } else if (datos.error) {
        contenido = (
            <div className="categorias-inicio-estado">
                <div role="alert">
                    <p>
                        <strong>{estados.error.titulo}</strong>
                    </p>
                    <p>{estados.error.texto}</p>
                </div>

                <Boton variante="secundario" onClick={datos.recargar}>
                    {estados.error.botones.reintentar}
                </Boton>
            </div>
        );
    } else if (datos.categorias.length === 0) {
        contenido = (
            <div className="categorias-inicio-estado" role="status">
                <p>
                    <strong>{estados.vacio.titulo}</strong>
                </p>
                <p>{estados.vacio.texto}</p>
            </div>
        );
    } else {
        contenido = (
            <>
                <ul className="categorias-inicio-web">
                    {datos.categorias.map((categoria) => (
                        <li key={categoria.id}>
                            <Link
                                to={rutaCategoria(categoria.id)}
                                className="categoria-inicio-enlace"
                            >
                                <span className="categoria-inicio-simbolo">
                                    <Icono
                                        nombre={
                                            ICONOS_CATEGORIAS[categoria.id] ??
                                            "calendario"
                                        }
                                        className="categoria-inicio-icono"
                                    />
                                </span>

                                <span className="categoria-inicio-textos">
                                    <span className="categoria-inicio-nombre">
                                        {categoria.nombre}
                                    </span>

                                    <span className="categoria-inicio-cantidad">
                                        {presentarCantidad(
                                            categoria.eventos,
                                            textos,
                                        )}
                                    </span>
                                </span>
                            </Link>
                        </li>
                    ))}
                </ul>

                <ul className="categorias-inicio-movil">
                    <li>
                        <Chip to="/explorar" activo>
                            {textoTodos}
                        </Chip>
                    </li>

                    {datos.categorias.map((categoria) => (
                        <li key={categoria.id}>
                            <Chip to={rutaCategoria(categoria.id)}>
                                {categoria.nombre}
                            </Chip>
                        </li>
                    ))}
                </ul>
            </>
        );
    }

    return <div className="categorias-inicio">{contenido}</div>;
}
