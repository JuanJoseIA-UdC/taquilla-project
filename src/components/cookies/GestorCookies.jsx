import BannerCookies from "./BannerCookies.jsx";
import "./GestorCookies.css";

export default function GestorCookies({ textos, preferencias }) {
    const { consentimiento, guardarConsentimiento, error } = preferencias;
    const banner = textos.cookies.banner;

    if (consentimiento !== null && !error) {
        return null;
    }

    function decidir(permitir, evento) {
        const teniaFoco = document.activeElement === evento.currentTarget;
        const guardado = guardarConsentimiento(permitir);

        if (guardado && teniaFoco) {
            document.getElementById("contenido")?.focus({
                preventScroll: true,
            });
        }
    }

    return (
        <div className="gestor-cookies">
            <BannerCookies
                titulo={banner.titulo}
                descripcion={banner.texto}
                textoRechazar={banner.botones.rechazar}
                textoAceptar={banner.botones.aceptar}
                onRechazar={(evento) => decidir(false, evento)}
                onAceptar={(evento) => decidir(true, evento)}
            />

            {error && (
                <p className="gestor-cookies-error" role="alert">
                    {textos.estados.error.titulo}
                </p>
            )}
        </div>
    );
}
