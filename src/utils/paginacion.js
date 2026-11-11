export function obtenerPaginasVisibles(pagina, total) {
    if (
        !Number.isSafeInteger(pagina) ||
        !Number.isSafeInteger(total) ||
        pagina < 1 ||
        total < 1
    ) {
        return [];
    }

    const actual = Math.min(pagina, total);

    if (total <= 5) {
        return Array.from({ length: total }, (_, indice) => indice + 1);
    }

    if (actual <= 3) {
        return [1, 2, 3, "fin", total];
    }

    if (actual >= total - 2) {
        return [1, "inicio", total - 2, total - 1, total];
    }

    return [1, "inicio", actual, "fin", total];
}
