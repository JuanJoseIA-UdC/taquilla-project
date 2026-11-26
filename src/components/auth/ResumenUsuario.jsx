import AvatarUsuario from "./AvatarUsuario.jsx";
import "./ResumenUsuario.css";

export default function ResumenUsuario({ usuario, inverso = false }) {
    return (
        <div className="resumen-usuario">
            <AvatarUsuario nombre={usuario.nombre} inverso={inverso} />

            <div className="resumen-usuario-datos">
                <p className="resumen-usuario-nombre cuerpo-p-fuerte">
                    {usuario.nombre}
                </p>
                <p className="resumen-usuario-correo detalle-nota">
                    {usuario.correo}
                </p>
            </div>
        </div>
    );
}
