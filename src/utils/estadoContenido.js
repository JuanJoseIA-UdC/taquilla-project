// Las secciones de Inicio priorizan la carga sobre el error y el resultado vacío.
export function obtenerEstadoContenido({ cargando, error, vacio }) {
    if (cargando) return "cargando";
    if (error) return "error";
    if (vacio) return "vacio";
    return null;
}
