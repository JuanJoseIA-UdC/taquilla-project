// Respaldo de la interfaz compartida y de las secciones de Inicio implementadas.
// No contiene datos del catálogo ni sustituye las respuestas válidas de la API.
export const TEXTOS_RESPALDO = {
    es: {
        navbar: {
            logo: {
                texto: "taquilla",
                aria: "Taquilla, ir al inicio",
            },
            enlaces: {
                inicio: "Inicio",
                explorar: "Explorar",
            },
            buscador: {
                placeholder: "Busca eventos o artistas",
                aria: "Buscar eventos",
            },
            botones: {
                ingresar: "Ingresar",
                crearCuenta: "Crear cuenta",
            },
            aria: {
                idioma: "Cambiar idioma",
                accesibilidad: "Abrir el panel de accesibilidad",
            },
        },
        menuMovil: {
            abrir: "Abrir menú",
            cerrar: "Cerrar menú",
            secciones: {
                idioma: "Idioma",
                accesibilidad: "Accesibilidad",
            },
        },
        paginas: {
            inicio: {
                hero: {
                    etiquetas: {
                        temporada: "Temporada nov – dic 2026",
                    },
                    titulo: "Tu próxima noche empieza aquí",
                    subtitulo:
                        "Conciertos, teatro, deportes y festivales. Busca por categoría, fecha o ciudad y consulta todos los detalles de cada evento.",
                    buscador: {
                        etiquetas: {
                            que: "Qué",
                            donde: "Dónde",
                            cuando: "Cuándo",
                        },
                        placeholders: {
                            que: "Evento o artista",
                            cuando: "Cualquier fecha",
                            movil: "Evento, artista o lugar",
                        },
                        resumenMovil: "{ciudad} · {fecha}",
                        populares: "Populares:",
                        botones: {
                            buscar: "Buscar",
                        },
                    },
                    destacado: {
                        etiqueta: "Destacado",
                        desde: "Desde {precio}",
                        botones: {
                            verEvento: "Ver evento",
                        },
                    },
                },
            },
            noEncontrado: {
                contenido: {
                    titulo: "No encontramos esta página",
                    texto: "Puede que el evento ya no exista o que la dirección esté mal escrita.",
                    botones: {
                        volverInicio: "Volver al inicio",
                    },
                },
            },
        },
        footer: {
            lema: "Conciertos, teatro, deportes y festivales en un solo lugar. Explora eventos y consulta sus detalles.",
            columnas: {
                explora: {
                    titulo: "Explora",
                    enlaces: {
                        inicio: "Inicio",
                        explorar: "Explorar eventos",
                    },
                },
                cuenta: {
                    titulo: "Tu cuenta",
                    enlaces: {
                        ingresar: "Iniciar sesión",
                        crearCuenta: "Crear cuenta",
                    },
                },
                legal: {
                    titulo: "Legal",
                    enlaces: {
                        terminos: "Términos de uso",
                        accesibilidad: "Accesibilidad",
                    },
                },
            },
            legal: {
                derechos: "© {anio} Taquilla · Proyecto académico",
                nota: "Datos de ejemplo con fines académicos.",
            },
        },
        general: {
            aria: {
                cerrarDialogo: "Cerrar el diálogo",
                saltarAlContenido: "Saltar al contenido principal",
            },
        },
        accesibilidad: {
            titulo: "Accesibilidad",
            tamanoTexto: "Tamaño del texto",
            muestraTamano: "A",
            altoContraste: {
                nombre: "Alto contraste",
                descripcion: "Más diferencia entre el texto y el fondo",
            },
            reducirMovimiento: {
                nombre: "Reducir movimiento",
                descripcion: "Sin animaciones ni transiciones",
            },
            subrayarEnlaces: {
                nombre: "Subrayar enlaces",
                descripcion: "Los enlaces se distinguen sin depender del color",
            },
            espaciadoLectura: {
                nombre: "Espaciado de lectura",
                descripcion: "Más espacio entre líneas y entre letras",
            },
            nota: "Se guarda en este dispositivo. Los valores iniciales salen de lo que ya definiste en tu sistema.",
            enlaces: {
                declaracion: "Declaración de accesibilidad",
            },
            botones: {
                restablecer: "Restablecer",
            },
            aria: {
                aumentarTexto: "Aumentar el tamaño del texto",
                disminuirTexto: "Disminuir el tamaño del texto",
            },
        },
        estados: {
            cargando: {
                indicador: "Cargando…",
            },
            vacio: {
                titulo: "No hay nada por aquí",
                texto: "Cuando haya información la verás en este lugar.",
            },
            error: {
                titulo: "Algo salió mal",
                texto: "Revisa tu conexión e inténtalo de nuevo.",
                botones: {
                    reintentar: "Reintentar",
                },
            },
        },
    },
    en: {
        navbar: {
            logo: {
                texto: "taquilla",
                aria: "Taquilla, go to the home page",
            },
            enlaces: {
                inicio: "Home",
                explorar: "Explore",
            },
            buscador: {
                placeholder: "Search events or artists",
                aria: "Search events",
            },
            botones: {
                ingresar: "Log in",
                crearCuenta: "Sign up",
            },
            aria: {
                idioma: "Change language",
                accesibilidad: "Open the accessibility panel",
            },
        },
        menuMovil: {
            abrir: "Open menu",
            cerrar: "Close menu",
            secciones: {
                idioma: "Language",
                accesibilidad: "Accessibility",
            },
        },
        paginas: {
            inicio: {
                hero: {
                    etiquetas: {
                        temporada: "Season Nov – Dec 2026",
                    },
                    titulo: "Your next night out starts here",
                    subtitulo:
                        "Concerts, theater, sports and festivals. Search by category, date or city and see every detail of each event.",
                    buscador: {
                        etiquetas: {
                            que: "What",
                            donde: "Where",
                            cuando: "When",
                        },
                        placeholders: {
                            que: "Event or artist",
                            cuando: "Any date",
                            movil: "Event, artist or venue",
                        },
                        resumenMovil: "{ciudad} · {fecha}",
                        populares: "Popular:",
                        botones: {
                            buscar: "Search",
                        },
                    },
                    destacado: {
                        etiqueta: "Featured",
                        desde: "From {precio}",
                        botones: {
                            verEvento: "See event",
                        },
                    },
                },
            },
            noEncontrado: {
                contenido: {
                    titulo: "We couldn't find this page",
                    texto: "The event may no longer exist or the address may be misspelled.",
                    botones: {
                        volverInicio: "Back to home",
                    },
                },
            },
        },
        footer: {
            lema: "Concerts, theater, sports and festivals in one place. Explore events and see their details.",
            columnas: {
                explora: {
                    titulo: "Explore",
                    enlaces: {
                        inicio: "Home",
                        explorar: "Explore events",
                    },
                },
                cuenta: {
                    titulo: "Your account",
                    enlaces: {
                        ingresar: "Log in",
                        crearCuenta: "Sign up",
                    },
                },
                legal: {
                    titulo: "Legal",
                    enlaces: {
                        terminos: "Terms of use",
                        accesibilidad: "Accessibility",
                    },
                },
            },
            legal: {
                derechos: "© {anio} Taquilla · Academic project",
                nota: "Sample data for academic purposes.",
            },
        },
        general: {
            aria: {
                cerrarDialogo: "Close the dialog",
                saltarAlContenido: "Skip to main content",
            },
        },
        accesibilidad: {
            titulo: "Accessibility",
            tamanoTexto: "Text size",
            muestraTamano: "A",
            altoContraste: {
                nombre: "High contrast",
                descripcion: "More difference between text and background",
            },
            reducirMovimiento: {
                nombre: "Reduce motion",
                descripcion: "No animations or transitions",
            },
            subrayarEnlaces: {
                nombre: "Underline links",
                descripcion: "Links stand out without relying on color",
            },
            espaciadoLectura: {
                nombre: "Reading spacing",
                descripcion: "More space between lines and letters",
            },
            nota: "Saved on this device. The initial values come from your system settings.",
            enlaces: {
                declaracion: "Accessibility statement",
            },
            botones: {
                restablecer: "Reset",
            },
            aria: {
                aumentarTexto: "Increase text size",
                disminuirTexto: "Decrease text size",
            },
        },
        estados: {
            cargando: {
                indicador: "Loading…",
            },
            vacio: {
                titulo: "Nothing here yet",
                texto: "When there is information you will see it here.",
            },
            error: {
                titulo: "Something went wrong",
                texto: "Check your connection and try again.",
                botones: {
                    reintentar: "Try again",
                },
            },
        },
    },
};
