import { TEXTOS_COMPLEMENTARIOS } from "../data/textosComplementarios.js";

export function completarTextos(textos, idioma) {
    const complemento = TEXTOS_COMPLEMENTARIOS[idioma];
    const explorar = textos.paginas.explorar;
    const filtros = explorar.filtros;
    const filtrosComplementarios = complemento.paginas.explorar.filtros;

    return {
        ...textos,
        menuMovil: {
            ...textos.menuMovil,
            aria: {
                ...complemento.menuMovil.aria,
                ...textos.menuMovil.aria,
            },
        },
        paginas: {
            ...textos.paginas,
            explorar: {
                ...explorar,
                filtros: {
                    ...filtrosComplementarios,
                    quitar: `${textos.general.acciones.eliminar}: {filtro}`,
                    ...filtros,
                    fecha: {
                        ...filtrosComplementarios.fecha,
                        ...filtros.fecha,
                    },
                    botones: {
                        ...filtrosComplementarios.botones,
                        ...filtros.botones,
                    },
                },
            },
        },
    };
}
