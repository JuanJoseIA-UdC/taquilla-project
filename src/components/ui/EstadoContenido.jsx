import Boton from "./Boton.jsx";

export default function EstadoContenido({
    tipo,
    textos,
    onReintentar,
    className = "",
}) {
    if (tipo === "cargando") {
        return (
            <div className={className} role="status">
                <p>{textos.cargando.indicador}</p>
            </div>
        );
    }

    if (tipo === "error") {
        return (
            <div className={className}>
                <div role="alert">
                    <p>
                        <strong>{textos.error.titulo}</strong>
                    </p>
                    <p>{textos.error.texto}</p>
                </div>

                <Boton variante="secundario" onClick={onReintentar}>
                    {textos.error.botones.reintentar}
                </Boton>
            </div>
        );
    }

    if (tipo === "vacio") {
        return (
            <div className={className} role="status">
                <p>
                    <strong>{textos.vacio.titulo}</strong>
                </p>
                <p>{textos.vacio.texto}</p>
            </div>
        );
    }

    return null;
}
