import { useEffect, useState } from "react";
import { Route, Routes } from "react-router";
import { useTextos } from "./hooks/useTextos.js";
import LayoutPublico from "./components/layout/LayoutPublico.jsx";

export default function App() {
    const [idioma, setIdioma] = useState("es");
    const [textoGrande, setTextoGrande] = useState(false);
    const datos = useTextos(idioma);
    const nav = datos.textos?.navbar;

    useEffect(() => {
        document.documentElement.lang = idioma;
    }, [idioma]);

    useEffect(() => {
        document.documentElement.style.fontSize = textoGrande ? "112%" : "";

        return () => {
            document.documentElement.style.fontSize = "";
        };
    }, [textoGrande]);

    return (
        <LayoutPublico
            datos={datos}
            idioma={idioma}
            cambiarIdioma={setIdioma}
            textoGrande={textoGrande}
            alternarTexto={() => setTextoGrande((valor) => !valor)}
        >
            <Routes>
                <Route path="/" element={<h1>{nav?.enlaces.inicio}</h1>} />
                <Route
                    path="/explorar"
                    element={<h1>{nav?.enlaces.explorar}</h1>}
                />
                <Route
                    path="/ingresar"
                    element={<h1>{nav?.botones.ingresar}</h1>}
                />
                <Route
                    path="/registro"
                    element={<h1>{nav?.botones.crearCuenta}</h1>}
                />
            </Routes>
        </LayoutPublico>
    );
}
