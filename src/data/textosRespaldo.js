// Respaldo de la interfaz compartida y de las secciones de Inicio implementadas.
// No contiene datos del catálogo ni sustituye las respuestas válidas de la API.
export const TEXTOS_RESPALDO = {
    es: {
        idioma: {
            es: "Español",
            en: "English",
            codigoEs: "ES",
            codigoEn: "EN",
        },
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
        cookies: {
            banner: {
                titulo: "Usamos cookies",
                texto: "Usamos solo las cookies necesarias para mantener tu sesión y recordar tu idioma. Puedes aceptarlas o rechazarlas.",
                botones: {
                    rechazar: "Rechazar",
                    aceptar: "Aceptar",
                },
            },
        },
        componentes: {
            paginacion: {
                aria: {
                    etiqueta: "Paginación",
                    irAPagina: "Ir a la página {numero}",
                    paginaActual: "Página {numero}, página actual",
                    siguiente: "Página siguiente",
                    anterior: "Página anterior",
                },
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
                categorias: {
                    eventos: {
                        uno: "{cantidad} evento",
                        otro: "{cantidad} eventos",
                    },
                },
                destacados: {
                    titulo: "Destacados de la semana",
                    subtitulo:
                        "Los eventos con más entradas vendidas en los últimos 7 días",
                    enlaces: {
                        verTodos: "Ver todos",
                    },
                },
                proximos: {
                    titulo: "Próximamente en {ciudad}",
                    subtitulo: "Cambia la ciudad desde el buscador",
                },
                tarjeta: {
                    desde: "Desde",
                    botones: {
                        verEvento: "Ver evento",
                    },
                },
                filtrosMovil: {
                    todos: "Todos",
                    destacados: "Destacados",
                    finDeSemana: "Este fin de semana",
                },
            },
            explorar: {
                resultados: {
                    uno: "{cantidad} evento coincide con tus filtros",
                    otro: "{cantidad} eventos coinciden con tus filtros",
                },
                filtros: {
                    titulo: "Filtros",
                    categoria: "Categoría",
                    botones: {
                        limpiar: "Limpiar",
                        verResultados: "Ver {cantidad} eventos",
                    },
                    fecha: {
                        titulo: "Fecha",
                        hoy: "Hoy",
                        finDeSemana: "Este fin de semana",
                        mes: "Este mes",
                        elegir: "Elegir fechas",
                    },
                    ciudad: "Ciudad",
                    precio: "Precio",
                },
                orden: {
                    etiqueta: "Ordenar:",
                    opciones: {
                        fecha: "Fecha más próxima",
                        precio: "Precio más bajo",
                        popularidad: "Más populares",
                    },
                },
                paginacion: {
                    titulo: "Paginación de eventos",
                    pagina: "Página {pagina}",
                    anterior: "Página anterior",
                    siguiente: "Página siguiente",
                },
                resultadosCorto: {
                    uno: "{cantidad} evento",
                    otro: "{cantidad} eventos",
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
            acciones: {
                aplicar: "Aplicar",
                eliminar: "Eliminar",
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
        idioma: {
            es: "Español",
            en: "English",
            codigoEs: "ES",
            codigoEn: "EN",
        },
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
        cookies: {
            banner: {
                titulo: "We use cookies",
                texto: "We only use the cookies needed to keep you logged in and remember your language. You can accept or reject them.",
                botones: {
                    rechazar: "Reject",
                    aceptar: "Accept",
                },
            },
        },
        componentes: {
            paginacion: {
                aria: {
                    etiqueta: "Pagination",
                    irAPagina: "Go to page {numero}",
                    paginaActual: "Page {numero}, current page",
                    siguiente: "Next page",
                    anterior: "Previous page",
                },
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
                categorias: {
                    eventos: {
                        uno: "{cantidad} event",
                        otro: "{cantidad} events",
                    },
                },
                destacados: {
                    titulo: "This week's highlights",
                    subtitulo:
                        "The events with the most tickets sold in the last 7 days",
                    enlaces: {
                        verTodos: "See all",
                    },
                },
                proximos: {
                    titulo: "Coming soon in {ciudad}",
                    subtitulo: "Change the city from the search bar",
                },
                tarjeta: {
                    desde: "From",
                    botones: {
                        verEvento: "See event",
                    },
                },
                filtrosMovil: {
                    todos: "All",
                    destacados: "Featured",
                    finDeSemana: "This weekend",
                },
            },
            explorar: {
                resultados: {
                    uno: "{cantidad} event matches your filters",
                    otro: "{cantidad} events match your filters",
                },
                filtros: {
                    titulo: "Filters",
                    categoria: "Category",
                    botones: {
                        limpiar: "Clear",
                        verResultados: "See {cantidad} events",
                    },
                    fecha: {
                        titulo: "Date",
                        hoy: "Today",
                        finDeSemana: "This weekend",
                        mes: "This month",
                        elegir: "Choose dates",
                    },
                    ciudad: "City",
                    precio: "Price",
                },
                orden: {
                    etiqueta: "Sort:",
                    opciones: {
                        fecha: "Soonest date",
                        precio: "Lowest price",
                        popularidad: "Most popular",
                    },
                },
                paginacion: {
                    titulo: "Event pagination",
                    pagina: "Page {pagina}",
                    anterior: "Previous page",
                    siguiente: "Next page",
                },
                resultadosCorto: {
                    uno: "{cantidad} event",
                    otro: "{cantidad} events",
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
            acciones: {
                aplicar: "Apply",
                eliminar: "Delete",
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
