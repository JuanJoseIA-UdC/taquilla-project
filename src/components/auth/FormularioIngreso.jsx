import { useId, useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router";
import Ojo from "../../assets/iconos/eye.svg?react";
import Boton from "../ui/Boton.jsx";
import Campo from "../ui/Campo.jsx";
import Casilla from "../ui/Casilla.jsx";
import "./FormularioIngreso.css";
import Icono from "../ui/Icono.jsx";

export default function FormularioIngreso({
    textos,
    errores,
    estados,
    onIngresar,
}) {
    const [faltantes, setFaltantes] = useState({});
    const [claveVisible, setClaveVisible] = useState(false);
    const claveId = useId();
    const hayErrores = faltantes.correo || faltantes.clave;

    const [enviando, setEnviando] = useState(false);
    const [fallo, setFallo] = useState(null);
    const peticionRef = useRef(null);
    const navigate = useNavigate();

    const [bloqueadoHasta, setBloqueadoHasta] = useState(null);
    const [segundosRestantes, setSegundosRestantes] = useState(0);

    const bloqueado = segundosRestantes > 0;
    const deshabilitado = enviando || bloqueado;

    const aviso = fallo === "generico" ? estados.error : errores[fallo];

    const textoBoton = enviando
        ? textos.mensajes.ingresando
        : fallo === "conexion"
          ? errores.conexion.botones.reintentar
          : textos.botones.ingresar;

    useEffect(() => {
        return () => {
            peticionRef.current?.abort();
            peticionRef.current = null;
        };
    }, []);

    useEffect(() => {
        if (bloqueadoHasta === null) return;

        function actualizarEspera() {
            const restantes = Math.max(
                0,
                Math.ceil((bloqueadoHasta - Date.now()) / 1000),
            );

            setSegundosRestantes(restantes);

            if (restantes === 0) {
                setBloqueadoHasta(null);
                setFallo((actual) =>
                    actual === "demasiadosIntentos" ? null : actual,
                );
            }
        }

        const intervalo = setInterval(actualizarEspera, 250);

        document.addEventListener("visibilitychange", actualizarEspera);

        return () => {
            clearInterval(intervalo);
            document.removeEventListener("visibilitychange", actualizarEspera);
        };
    }, [bloqueadoHasta]);

    async function enviar(evento) {
        evento.preventDefault();

        if (
            peticionRef.current ||
            segundosRestantes > 0 ||
            (bloqueadoHasta !== null && Date.now() < bloqueadoHasta)
        ) {
            return;
        }

        const formulario = evento.currentTarget;
        const datos = new FormData(formulario);
        const correo = datos.get("correo").trim();
        const clave = datos.get("clave");

        const nuevosFaltantes = {
            correo: correo.length === 0,
            clave: clave.length === 0,
        };

        setFaltantes(nuevosFaltantes);
        setFallo(null);

        if (nuevosFaltantes.correo) {
            formulario.elements.namedItem("correo").focus();
            return;
        }

        if (nuevosFaltantes.clave) {
            formulario.elements.namedItem("clave").focus();
            return;
        }

        const controlador = new AbortController();
        peticionRef.current = controlador;
        setEnviando(true);

        const limite = setTimeout(() => controlador.abort(), 12000);

        try {
            await onIngresar({ correo, clave }, controlador.signal);

            if (peticionRef.current === controlador) {
                navigate("/", { replace: true });
            }
        } catch (error) {
            if (peticionRef.current !== controlador) return;

            if (
                error.estado === 401 &&
                error.codigo === "credenciales_invalidas"
            ) {
                setFallo("credenciales");
            } else if (
                error.estado === 429 &&
                error.codigo === "demasiadas_peticiones"
            ) {
                const hasta = error.reintentarDesde;

                if (Number.isFinite(hasta) && hasta > Date.now()) {
                    setBloqueadoHasta(hasta);
                    setSegundosRestantes(
                        Math.ceil((hasta - Date.now()) / 1000),
                    );
                    setFallo("demasiadosIntentos");
                } else {
                    setFallo("generico");
                }
            } else if (
                error instanceof TypeError ||
                error.name === "AbortError"
            ) {
                setFallo("conexion");
            } else {
                setFallo("generico");
            }
        } finally {
            clearTimeout(limite);

            if (peticionRef.current === controlador) {
                peticionRef.current = null;
                setEnviando(false);
            }
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
                    <Icono
                        nombre="alerta"
                        className="formulario-ingreso-aviso-icono"
                    />

                    <div className="formulario-ingreso-aviso-contenido">
                        <strong>{errores.camposObligatorios.titulo}</strong>
                        <p>{errores.camposObligatorios.texto}</p>
                    </div>
                </div>
            )}

            {aviso && (
                <div className="formulario-ingreso-aviso" role="alert">
                    <Icono
                        nombre="alerta"
                        className="formulario-ingreso-aviso-icono"
                    />

                    <div className="formulario-ingreso-aviso-contenido">
                        <strong>{aviso.titulo}</strong>

                        {fallo === "demasiadosIntentos" ? (
                            <p role="timer" aria-live="off">
                                {aviso.texto.replace(
                                    "{segundos}",
                                    String(segundosRestantes),
                                )}
                            </p>
                        ) : (
                            <p>{aviso.texto}</p>
                        )}
                    </div>
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
                disabled={deshabilitado}
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
                        disabled={deshabilitado}
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
                disabled={deshabilitado}
            />

            <div className="formulario-ingreso-opciones">
                <Casilla
                    name="mantenerSesion"
                    defaultChecked
                    disabled={deshabilitado}
                >
                    {textos.etiquetas.mantenerSesion}
                </Casilla>
                <Link to="/recuperar-clave" className="cuerpo-p-fuerte">
                    {textos.enlaces.olvidasteClave}
                </Link>
            </div>

            <Boton
                type="submit"
                tamano="g"
                disabled={deshabilitado}
                className={enviando ? "formulario-ingreso-enviando" : ""}
            >
                {enviando && (
                    <span
                        className="formulario-ingreso-indicador"
                        aria-hidden="true"
                    />
                )}
                <span role="status">{textoBoton}</span>
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
