import { useId, useState } from "react";
import { Link } from "react-router";
import Ojo from "../../assets/iconos/eye.svg?react";
import Boton from "../ui/Boton.jsx";
import Campo from "../ui/Campo.jsx";
import Casilla from "../ui/Casilla.jsx";
import "./FormularioIngreso.css";

export default function FormularioIngreso({ textos, errores }) {
    const [faltantes, setFaltantes] = useState({});
    const [claveVisible, setClaveVisible] = useState(false);
    const claveId = useId();
    const hayErrores = faltantes.correo || faltantes.clave;

    function enviar(evento) {
        evento.preventDefault();

        const formulario = evento.currentTarget;
        const datos = new FormData(formulario);
        const correo = datos.get("correo").trim();
        const clave = datos.get("clave");

        const nuevosFaltantes = {
            correo: correo.length === 0,
            clave: clave.length === 0,
        };

        setFaltantes(nuevosFaltantes);

        if (nuevosFaltantes.correo) {
            formulario.elements.namedItem("correo").focus();
        } else if (nuevosFaltantes.clave) {
            formulario.elements.namedItem("clave").focus();
        }
    }

    return (
        <form className="formulario-ingreso" onSubmit={enviar} noValidate>
            <h1 className="titular-h1">{textos.titulo}</h1>
            <p className="formulario-ingreso-subtitulo cuerpo-m">
                {textos.subtitulo}
            </p>
            {hayErrores && (
                <div className="formulario-ingreso-aviso" role="alert">
                    <strong>{errores.camposObligatorios.titulo}</strong>
                    <p>{errores.camposObligatorios.texto}</p>
                </div>
            )}

            <Campo
                name="correo"
                type="email"
                etiqueta={textos.etiquetas.correo}
                placeholder={textos.placeholders.correo}
                autoComplete="username"
                required
                error={faltantes.correo ? errores.correoObligatorio : undefined}
            />

            <Campo
                id={claveId}
                name="clave"
                type={claveVisible ? "text" : "password"}
                className="formulario-ingreso-clave"
                etiqueta={textos.etiquetas.clave}
                autoComplete="current-password"
                required
                error={faltantes.clave ? errores.claveObligatoria : undefined}
                accion={
                    <button
                        className="formulario-ingreso-visibilidad"
                        type="button"
                        aria-controls={claveId}
                        aria-label={
                            claveVisible
                                ? textos.botones.ocultarClave
                                : textos.botones.mostrarClave
                        }
                        onClick={() => setClaveVisible((visible) => !visible)}
                    >
                        <Ojo aria-hidden="true" focusable="false" />
                        {claveVisible && (
                            <span
                                className="formulario-ingreso-ojo-tachado"
                                aria-hidden="true"
                            />
                        )}
                    </button>
                }
            />

            <div className="formulario-ingreso-opciones">
                <Casilla name="mantenerSesion" defaultChecked>
                    {textos.etiquetas.mantenerSesion}
                </Casilla>
                <Link to="/recuperar-clave" className="cuerpo-p-fuerte">
                    {textos.enlaces.olvidasteClave}
                </Link>
            </div>

            <Boton type="submit" tamano="g">
                {textos.botones.ingresar}
            </Boton>

            <p className="formulario-ingreso-registro cuerpo-p">
                {textos.mensajes.sinCuenta}{" "}
                <Link to="/registro" className="cuerpo-p-fuerte">
                    {textos.enlaces.crearCuenta}
                </Link>
            </p>
        </form>
    );
}
