const DURACION_DIAS = 180;

export function leerCookie(nombre) {
    const prefijo = `${encodeURIComponent(nombre)}=`;

    try {
        const cookie = document.cookie
            .split(";")
            .map((parte) => parte.trim())
            .find((parte) => parte.startsWith(prefijo));

        return cookie ? decodeURIComponent(cookie.slice(prefijo.length)) : null;
    } catch {
        return null;
    }
}

export function guardarCookie(nombre, valor) {
    const valorTexto = String(valor);
    const duracion = DURACION_DIAS * 24 * 60 * 60;
    const segura = window.location.protocol === "https:" ? "; Secure" : "";

    try {
        document.cookie =
            `${encodeURIComponent(nombre)}=${encodeURIComponent(valorTexto)}` +
            `; Max-Age=${duracion}; Path=/; SameSite=Lax${segura}`;

        return leerCookie(nombre) === valorTexto;
    } catch {
        return false;
    }
}

export function eliminarCookie(nombre) {
    const segura = window.location.protocol === "https:" ? "; Secure" : "";

    try {
        document.cookie =
            `${encodeURIComponent(nombre)}=` +
            `; Max-Age=0; Path=/; SameSite=Lax${segura}`;

        return leerCookie(nombre) === null;
    } catch {
        return false;
    }
}
