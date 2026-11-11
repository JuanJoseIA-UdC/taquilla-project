import { useEffect, useRef } from "react";
import Icono from "../ui/Icono.jsx";
import "./BuscadorExplorar.css";

export default function BuscadorExplorar({
    consulta,
    placeholder,
    etiqueta,
    onBuscar,
}) {
    const campoRef = useRef(null);

    useEffect(() => {
        campoRef.current.value = consulta;
    }, [consulta]);

    function buscar(evento) {
        evento.preventDefault();

        const formulario = new FormData(evento.currentTarget);
        const q = String(formulario.get("q") ?? "").trim();

        campoRef.current.value = q;
        onBuscar(q);
    }

    return (
        <form
            className="buscador-explorar"
            role="search"
            aria-label={etiqueta}
            onSubmit={buscar}
        >
            <button
                type="submit"
                className="buscador-explorar-enviar"
                aria-label={etiqueta}
            >
                <Icono nombre="buscar" className="buscador-explorar-icono" />
            </button>

            <input
                ref={campoRef}
                type="search"
                name="q"
                defaultValue={consulta}
                placeholder={placeholder}
                aria-label={etiqueta}
                enterKeyHint="search"
            />
        </form>
    );
}
