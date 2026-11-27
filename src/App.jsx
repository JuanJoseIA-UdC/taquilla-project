import { useIdiomas } from "./hooks/useIdiomas.js";
import { usePreferencias } from "./hooks/usePreferencias.js";
import { Route, Routes } from "react-router";
import { useTextos } from "./hooks/useTextos.js";
import { useSesion } from "./hooks/useSesion.js";
import LayoutPublico from "./components/layout/LayoutPublico.jsx";
import NoEncontrado from "./pages/NoEncontrado.jsx";
import Inicio from "./pages/Inicio.jsx";
import Explorar from "./pages/Explorar.jsx";
import DetalleEvento from "./pages/DetalleEvento.jsx";
import Ingresar from "./pages/Ingresar.jsx";

export default function App() {
    const { idiomas } = useIdiomas();
    const preferencias = usePreferencias();
    const { idioma, cambiarIdioma } = preferencias;

    const datos = useTextos(idioma);
    const nav = datos.textos?.navbar;
    const sesion = useSesion();

    return (
        <LayoutPublico
            datos={datos}
            idioma={idioma}
            idiomas={idiomas}
            cambiarIdioma={cambiarIdioma}
            preferencias={preferencias}
            usuario={sesion.usuario}
            onCerrarSesion={sesion.cerrar}
            cerrandoSesion={sesion.cerrando}
            errorCierreSesion={sesion.errorCierre}
        >
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
                    path="/eventos/:slug"
                    element={
                        <DetalleEvento textos={datos.textos} idioma={idioma} />
                    }
                />
                <Route
                    path="/ingresar"
                    element={
                        <Ingresar
                            textos={datos.textos}
                            onIngresar={sesion.ingresar}
                        />
                    }
                />
                <Route
                    path="/recuperar-clave"
                    element={
                        <h1>
                            {
                                datos.textos.paginas.ingresar.formulario.enlaces
                                    .olvidasteClave
                            }
                        </h1>
                    }
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
