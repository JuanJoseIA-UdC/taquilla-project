import Boton from "../ui/Boton.jsx";
import Icono from "../ui/Icono.jsx";
import "./CierreSesion.css";

export default function CierreSesion({
    etiqueta,
    estados,
    cerrando,
    error,
    onCerrarSesion,
    enMenu = false,
}) {
    const textoBoton = cerrando
        ? estados.cargando.indicador
        : error
          ? estados.error.botones.reintentar
          : etiqueta;

    return (
        <div
            className={["cierre-sesion", enMenu ? "cierre-sesion--menu" : ""]
                .filter(Boolean)
                .join(" ")}
        >
            {error && (
                <p className="cierre-sesion-error cuerpo-p" role="alert">
                    {estados.error.texto}
                </p>
            )}

            <Boton
                variante={enMenu ? "fantasma" : "secundario"}
                disabled={cerrando}
                onClick={onCerrarSesion}
            >
                {enMenu && (
                    <Icono nombre="salir" className="cierre-sesion-icono" />
                )}
                <span role="status">{textoBoton}</span>
            </Boton>
        </div>
    );
}
