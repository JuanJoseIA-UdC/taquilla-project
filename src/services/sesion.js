const API = `${import.meta.env.VITE_API_URL}/sesion`;

export async function iniciarSesion({ correo, clave }, signal) {
    const respuesta = await fetch(API, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ correo, clave }),
        signal,
    });

    const contenido = await respuesta.json();

    if (!respuesta.ok) {
        const error = new Error(`HTTP ${respuesta.status}`);
        error.codigo = contenido?.error?.codigo ?? "generico";
        error.campos = contenido?.error?.campos;
        throw error;
    }

    const usuario = contenido?.usuario;

    if (
        typeof contenido?.token !== "string" ||
        contenido.token.trim() === "" ||
        typeof usuario?.nombre !== "string" ||
        usuario.nombre.trim() === "" ||
        typeof usuario?.correo !== "string"
    ) {
        throw new Error("La respuesta de sesión esta incompleta");
    }

    return contenido;
}

export async function cerrarSesion(token, signal) {
    const respuesta = await fetch(API, {
        method: "DELETE",
        headers: {
            Authorization: `Bearer ${token}`,
        },
        signal,
    });

    if (respuesta.status === 204) return;

    const contenido = await respuesta.json().catch(() => null);

    if (
        respuesta.status === 401 &&
        contenido?.error?.codigo === "no_autenticado"
    ) {
        return;
    }

    const error = new Error(`HTTP ${respuesta.status}`);
    error.codigo = contenido?.error?.codigo ?? "generico";
    throw error;
}
