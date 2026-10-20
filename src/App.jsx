import { useTextos } from "./hooks/useTextos.js";
import Navbar from "./components/Navbar.jsx";
import { useEffect, useState } from "react";

function leerSeccion() {
  return window.location.hash.slice(1).split("?")[0] || "inicio";
}

function App() {
  //Idioma por defecto español
  const [idioma, setIdioma] = useState("es");
  const [activo, setActivo] = useState(leerSeccion);
  const [textoGrande, setTextoGrande] = useState(false);
  const datos = useTextos(idioma);

  // Sincroniza la sección activa con la navegación del sitio.
  useEffect(() => {
    function actualizar() {
      setActivo(leerSeccion());
    }
    window.addEventListener("hashchange", actualizar);
    return () => window.removeEventListener("hashchange", actualizar);
  }, []);

  useEffect(() => {
    document.documentElement.lang = idioma;
  }, [idioma]);

  useEffect(() => {
    document.documentElement.style.fontSize = textoGrande ? "112%" : "";
    return () => {
      document.documentElement.style.fontSize = "";
    };
  }, [textoGrande]);

  function buscar(valor) {
    const parametros = new URLSearchParams({ buscar: valor });
    window.history.replaceState(null, "", `#explorar?${parametros}`);
    setActivo("explorar");
  }

  return (
    <Navbar
      {...datos}
      idioma={idioma}
      cambiarIdioma={setIdioma}
      activo={activo}
      onBuscar={buscar}
      textoGrande={textoGrande}
      alternarTexto={() => setTextoGrande((valor) => !valor)}
    />
  );
}

export default App;
