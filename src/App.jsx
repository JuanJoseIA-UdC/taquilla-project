import { useEffect, useState } from "react";
import { Route, Routes } from "react-router";
import { useTextos } from "./hooks/useTextos.js";
import LayoutPublico from "./components/layout/LayoutPublico.jsx";
import NoEncontrado from "./pages/NoEncontrado.jsx";
import Inicio from "./pages/Inicio.jsx";
import Explorar from "./pages/Explorar.jsx";

export default function App() {
    const [idioma, setIdioma] = useState("es");
    const datos = useTextos(idioma);
    const nav = datos.textos?.navbar;

    useEffect(() => {
        document.documentElement.lang = idioma;
    }, [idioma]);

    return (
        <LayoutPublico datos={datos} idioma={idioma} cambiarIdioma={setIdioma}>
            <Routes>
                <Route
                    path="/"
                    element={<Inicio textos={datos.textos} idioma={idioma} />}
                />
                <Route
                    path="/explorar"
                    element={<Explorar textos={datos.textos} idioma={idioma} />}
                />
                <Route
                    path="/ingresar"
                    element={<h1>{nav?.botones.ingresar}</h1>}
                />
                <Route
                    path="/registro"
                    element={<h1>{nav?.botones.crearCuenta}</h1>}
                />
                <Route
                    path="/registro/terminos"
                    element={
                        <h1>
                            {
                                datos.textos?.footer.columnas.legal.enlaces
                                    .terminos
                            }
                        </h1>
                    }
                />
                <Route
                    path="/accesibilidad"
                    element={
                        <h1>
                            {datos.textos?.accesibilidad.enlaces.declaracion}
                        </h1>
                    }
                />
                <Route
                    path="*"
                    element={<NoEncontrado textos={datos.textos} />}
                />
            </Routes>
        </LayoutPublico>
    );
}
