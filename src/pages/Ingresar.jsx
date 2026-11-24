import PortadaIngreso from "../components/auth/PortadaIngreso.jsx";
//import FormularioIngreso from "../components/auth/FormularioIngreso.jsx";
import "./Ingresar.css";

export default function Ingresar({ textos }) {
    const ingreso = textos.paginas.ingresar;

    return (
        <div className="ingresar">
            <PortadaIngreso textos={ingreso.presentacion} />
        </div>
    );
}