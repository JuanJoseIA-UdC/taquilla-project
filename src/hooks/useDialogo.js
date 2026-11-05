import { useEffect, useRef } from "react";

// Sincroniza el estado de React con el diálogo modal nativo.
// El bloqueo de desplazamiento se define en LayoutPublico.css.
export function useDialogo(abierto) {
    const dialogoRef = useRef(null);

    useEffect(() => {
        const dialogo = dialogoRef.current;

        if (abierto && !dialogo.open) {
            dialogo.showModal();
        } else if (!abierto && dialogo.open) {
            dialogo.close();
        }
    }, [abierto]);

    return dialogoRef;
}
