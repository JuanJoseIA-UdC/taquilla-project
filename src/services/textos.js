const API = `${import.meta.env.VITE_API_URL}/textos`;
const CLAVES_MENU = ["inicio", "explorar"];

function validarTextos(datos) {
    const textos = datos?.textos;
    const nav = textos?.navbar;
    const etiquetas = [
        nav?.logo?.texto,
        nav?.logo?.aria,
        ...CLAVES_MENU.map((clave) => nav?.enlaces?.[clave]),
        nav?.buscador?.placeholder,
        nav?.buscador?.aria,
        nav?.aria?.idioma,
        nav?.botones?.ingresar,
        textos?.menuMovil?.abrir,
        textos?.menuMovil?.cerrar,
    ];

    if (
        !etiquetas.every((valor) => typeof valor === "string" && valor.trim())
    ) {
        throw new Error("La respuesta no contiene los textos del navbar.");
    }

    return textos;
}

export async function obtenerTextos(idioma, signal) {
    const respuesta = await fetch(`${API}?idioma=${idioma}`, { signal });

    if (!respuesta.ok) {
        throw new Error(`HTTP ${respuesta.status}`);
    }

    return validarTextos(await respuesta.json());
}
