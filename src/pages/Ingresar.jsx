import { Link } from "react-router";
import PortadaIngreso from "../components/auth/PortadaIngreso.jsx";
import FormularioIngreso from "../components/auth/FormularioIngreso.jsx";
import "./Ingresar.css";

export default function Ingresar({ textos, onIngresar }) {
    const ingreso = textos.paginas.ingresar;

    return (
        <div className="ingresar">
            <PortadaIngreso textos={ingreso.presentacion} />
            <div className="ingresar-panel">
                <div className="ingresar-interior">
                    <Link to="/" className="ingresar-logo-movil">
                        <img
                            src="/logos/logo-normal.svg"
                            alt="Taquilla"
                            width="109"
                            height="32"
                        />
                    </Link>
                    <FormularioIngreso
                        textos={ingreso.formulario}
                        errores={ingreso.errores}
                        estados={textos.estados}
                        onIngresar={onIngresar}
                    />
                </div>
            </div>
        </div>
    );
}
