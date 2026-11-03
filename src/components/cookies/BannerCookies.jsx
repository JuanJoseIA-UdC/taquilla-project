import { useId } from "react";
import Boton from "../ui/Boton.jsx";
import "./BannerCookies.css";

export default function BannerCookies({
    titulo,
    descripcion,
    textoRechazar,
    textoAceptar,
    onRechazar,
    onAceptar,
}) {
    const tituloId = useId();

    return (
        <aside className="banner-cookies" aria-labelledby={tituloId}>
            <div className="banner-cookies-textos">
                <h2 id={tituloId} className="banner-cookies-titulo">
                    {titulo}
                </h2>

                <p className="banner-cookies-descripcion">{descripcion}</p>
            </div>

            <div className="banner-cookies-acciones">
                <Boton variante="secundario" tamano="m" onClick={onRechazar}>
                    {textoRechazar}
                </Boton>

                <Boton variante="primario" tamano="m" onClick={onAceptar}>
                    {textoAceptar}
                </Boton>
            </div>
        </aside>
    );
}
