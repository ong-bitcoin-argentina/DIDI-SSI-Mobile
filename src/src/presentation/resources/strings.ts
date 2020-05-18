import { JWTParseError } from "didi-sdk";

import { assertUnreachable } from "../../util/assertUnreachable";

import { LivenessGesture } from "../dashboard/validateIdentity/LivenessGesture";

function formatDatePart(date: Date) {
	const months = [
		"Enero",
		"Febrero",
		"Marzo",
		"Abril",
		"Mayo",
		"Junio",
		"Julio",
		"Agosto",
		"Septiembre",
		"Octubre",
		"Noviembre",
		"Diciembre"
	];
	return `${date.getDay()} de ${months[date.getMonth()]} de ${date.getFullYear()}`;
}

function formatHourPart(date: Date) {
	const pad = (n: number) => (n < 10 ? `0${n}` : n);
	return `${pad(date.getHours())}:${pad(date.getMinutes())}:${pad(date.getSeconds())}`;
}

function formatFullDate(date: Date) {
	return `${formatDatePart(date)}, ${formatHourPart(date)}`;
}

export default {
	debug: {
		menu: "Debug Menu",
		decodeJWT: "Decodificar JWT",
		serviceConfig: {
			barTitle: "Configuración de Servicios",
			instructions: "Dejar un input vacío y guardar lo retorna a su valor por defecto"
		},
		screenInProgress: "Pantalla en Construcción"
	},
	dashboard: {
		helloMessage: "Hola",
		evolution: {
			category: "Proceso",
			title: "Mi Evolución",
			validationIntro: "Validaciones:",
			validations: {
				cellPhone: "Número de Celular",
				email: "Correo Electrónico",
				document: "DNI"
			},
			validationState: {
				yes: "✓",
				no: "ｘ"
			},
			formatDate: formatDatePart
		},
		validateIdentity: {
			Start: {
				title: "Validá tu DNI para completar tu Perfil DIDI.",
				subtitle: null,
				button: "Validar DNI"
			},
			Success: {
				title: "¡Felicitaciones! Su DNI ha sido validado.",
				subtitle: "Recuerde que sus datos son privados.",
				button: "OK"
			},
			Failure: {
				title: "Lo lamentamos. Su identidad no ha sido validada.",
				subtitle: "Intente nuevamente.",
				button: "Reintentar"
			},
			"In Progress": {
				title: "Validación en progreso...",
				subtitle: "",
				button: null
			}
		},
		recentActivities: {
			label: "Actividades recientes",
			loadMore: "Cargar más"
		}
	},
	dashboardJump: {
		scanCredential: "Escanear Credenciales",
		shareCredential: "Compartir",
		createRound: "Armar Ronda",
		documents: "Ver Credenciales",
		identity: "Ver ID",
		editProfile: "Editar Perfil"
	},
	userData: {
		barTitle: "Mi perfil",
		personalDataLabel: "Datos personales",
		addressDataLabel: "Domicilio Legal",
		states: {
			approved: "Aprobado",
			pending: "Pendiente",
			rejected: "Rechazado"
		},
		editProfile: {
			barTitle: "Editar Perfil",
			saveChanges: "Guardar Cambios",

			firstNameMessage: "Nombre(s)",
			lastNameMessage: "Apellido(s)",
			cellMessage: "Celular",
			emailMessage: "Email",
			documentMessage: "DU / CI / Pasaporte",
			nationalityMessage: "Nacionalidad",
			addressMessage: "Domicilio",

			streetMessage: "Nombre de Calle / Manzana",
			numberMessage: "Número / Casa",
			departmentMessage: "Departamento",
			floorMessage: "Piso",
			neighborhoodMessage: "Barrio",
			postCodeMessage: "Código Postal"
		},
		changePassword: {
			barTitle: "Cambio de Contraseña",
			explanation: "Ingresá tu contraseña actual y tu nueva contraseña",
			requirementHeader: "Tu nueva contraseña debe tener:",
			indicator: {
				missing: "- ",
				ok: "✓ "
			},
			requirements: {
				PASSWORD_TOO_SHORT: "8 o más caracteres",
				PASSWORD_MISSING_UPPERCASE: "Mayúsculas",
				PASSWORD_MISSING_LOWERCASE: "Minúsculas",
				PASSWORD_MISSING_NUMBER: "Números",
				PASSWORD_MISSING_SPECIAL: "Símbolos"
			},
			mismatch: "Las contraseñas no coinciden",
			changePassword: "Cambiar Contraseña"
		},
		share: {
			barTitle: "Compartir",
			share: "Compartir",

			personalData: "Datos Personales",
			familyMessage: "Familia",
			coursesMessage: "Cursos",
			jobsMessage: "Trabajos",
			titlesMessage: "Títulos",
			othersMessage: "Otros"
		},
		changeEmail: {
			screenTitle: "Cambiar Email",
			messageHead: "Ingresá tu nuevo email y tu contraseña actual."
		},
		changePhone: {
			screenTitle: "Cambiar Teléfono",
			messageHead: "Ingresá tu nuevo número de teléfono y tu contraseña actual."
		}
	},
	recovery: {
		barTitle: "Recuperar Cuenta",
		startAccess: {
			recoveryButton: "Recuperar Cuenta",
			createButton: "Crear Cuenta",
			loginButton: "Ingresar"
		},
		enterEmail: {
			messageHead: "Ingresá tu email y contraseña",
			forgotPasswordMessage: "No recuerdo la contraseña"
		},
		explanation: {
			messageMotivesTitle: "Si quieres recuperar la cuenta es porque:",
			messageMotives: ["Te robaron el teléfono", "Cambiaste tu número", "Perdiste tu teléfono"],
			rememberEmailMessage: "Tenés que recordar tu email y contraseña de resguardo para recuperar tu cuenta",
			startButtonText: "Iniciar"
		},
		passwordRecover: {
			messageHead: "Recuperar Contraseña"
		},
		passwordRecoverEmailSent: {
			message: "Se te envió un email para empezar el proceso de recuperación de tu contraseña",
			buttonText: "Ver mis Emails"
		},
		passwordRecoverConfirmationCode: {
			messageHead: "Ingrese el código enviado por email",
			buttonText: "OK"
		},
		passwordChange: {
			barTitle: "Recuperar Contraseña",
			messageHead: "Ingresá tu nueva contraseña"
		}
	},
	signup: {
		barTitle: "Registro",
		onboarding: {
			close: "Cerrar"
		},
		enterPhone: {
			messageHead: "Ingresá tu teléfono para registrarte en la aplicación"
		},
		phoneVerified: {
			messageHead: "Su número de teléfono fue validado con éxito",
			cellNumber: "Número de celular",
			message: "Continúa con la configuración del Back up de identidad digital",
			next: "Siguiente"
		},
		enterName: {
			messageHead: "Ingresá tu nombre completo",
			next: "Siguiente"
		},
		enterEmail: {
			messageHead: "Ingrese su email para que pueda recuperar su Identidad Digital en caso de perder el teléfono.",
			backupGenerate: "Generar Backup"
		},
		registrationEmailSent: {
			message:
				"Recibirás un email para validar tu cuenta. Ingresá el código de 6 dígitos para verificar tu email. Luego, ingresa una contraseña para tu cuenta."
		},
		registrationValidated: {
			message: "Tu email fue validado con éxito y tu Identidad Digital fue resguardada.",
			buttonEnter: "Ingresar a Didi"
		},
		reset: {
			message:
				"No podés tener más de una cuenta guardada en un dispositivo.\n\n" +
				"Antes de crear otra cuenta, debés borrar la copia local de tu cuenta actual.\n\n" +
				"Para volver a usar tu cuenta actual, tendrás que Recuperar Cuenta.",
			cancel: "Salir sin cambios",
			doDelete: "Borrar copia local"
		}
	},
	login: {
		messageHead: "Ingresá tu email y contraseña",
		buttonText: "Ingresar"
	},
	accessCommon: {
		validateButtonText: "Validar",
		recoverButtonText: "Recuperar",
		defaultPlace: "Otros",
		enterPhone: {
			messageHead: "Cargá tu número de celular",
			countryCode: "Código de País"
		},
		verify: {
			phoneMessageHead: "Ingresá el código de 6 dígitos para verificar tu celular",
			emailMessageHead: "Ingresá el código de 6 dígitos para verificar tu email",
			resendCode: "¿No recibiste el código?\nReenviar código",
			resendCodeSuccess: {
				title: "Código reenviado",
				body: "Tené en cuenta que, por seguridad, solo se aceptará el último código que te enviamos."
			}
		},
		passwordDescription: "Usá ocho caracteres como mínimo con una combinación de letras, números y símbolos"
	},
	documents: {
		barTitle: "Mis Credenciales",
		detailBarTitle: "Credencial",
		emptyFilter: "Todavía no hay credenciales de esta categoría",
		filterAll: "Todos",
		filterEducation: "Educación",
		filterLivingPlace: "Vivienda",
		filterFinance: "Finanza",
		filterIdentity: "Identidad",
		filterShared: "Compartidos"
	},
	tabNames: {
		home: "Inicio",
		rounds: "Rondas",
		documents: "Credenciales",
		settings: "Configuración"
	},
	settings: {
		idLabel: "ID:",
		identityBackup: "Copia de Seguridad",
		changePassword: "Cambio de Contraseña",
		about: "Acerca de Didi",
		endSession: "Cerrar Sesión"
	},
	share: {
		title: "Compartir",
		generating: "Generando código QR...",
		next: "Ya compartí el código QR",
		shareTitle: "Credencial Didi",
		explanation:
			"Pedile al receptor que escanee este código QR para empezar a compartir tus credenciales.\n\nUna vez hecho esto, le aparecerá un código nuevo al receptor. Avanzá a la próxima pantalla para escanear su código."
	},
	shareExplanation: {
		title: "Compartir",
		explanation:
			"¿Cómo compartirás estas credenciales?\n\nEl receptor podrá verificar que las credenciales fueron enviadas intencionalmente y desde tu cuenta",
		direct: {
			button: "Directo a otra App DIDI",
			explanation: "Verificado como parte del proceso"
		},
		or: "o",
		link: {
			button: "Por enlace al visor",
			explanation: "Recibirás un pedido de verificación"
		},
		shareMessage: (sharedUri: string) => `Te comparto mis Credenciales desde la App de DIDI:\n\n${sharedUri}`
	},
	disclose: {
		title: "Compartir",
		request: {
			explanation: "Escaneá el siguiente código QR con la App DIDI que te está compartiendo sus credenciales.",
			next: "Siguiente"
		},
		response: {
			explanation: "Escaneá el siguiente código QR con la App DIDI con la que estás compartiendo tus credenciales."
		}
	},
	services: {
		changePasswordSuccess: "Contraseña cambiada exitosamente.",
		changePhoneSuccess: "Número de teléfono cambiado exitosamente.",
		changeEmailSuccess: "Email cambiado exitosamente."
	},
	validateIdentity: {
		header: "Validar Identidad",
		welcome: "Te damos la bienvenida",
		step: "Paso",
		stepTotal: "/3",
		what: {
			header: "¿Qué es la validación de identidad?",
			description:
				"Es un proceso simple mediante el cual vas a poder confirmar que vos sos quien decís ser. De esta forma, vas a poder acceder a todos los servicios de DIDI.",
			buttonText: "Siguiente"
		},
		howTo: {
			header: "¿Cómo lo hago?",
			intro: "Seguí estos pasos:",
			steps: [
				"Buscá un lugar iluminado y con fondo claro",
				"Tené tu DNI a mano",
				"Tené acceso a internet o a datos móviles"
			],
			buttonText: "Comencemos"
		},
		explainFront: {
			step: 1,
			header: "Digitalizando el DNI",
			description:
				"A continuación tendremos que sacar una foto al frente de tu DNI. Cuando lo tengas a mano, hacé click en el ícono de la cámara.",
			confirmation: "Asegurate de que el texto esté al derecho y sea claramente legible.",
			barcodeConfirmation: {
				found: "Se identificó el código de barras.",
				notFound: "No se identificó un código de barras. Si está de este lado del DNI, volvé a tomar la foto."
			}
		},
		explainBack: {
			step: 2,
			header: "Digitalizando el DNI",
			description: "Ahora da vuelta el DNI y sacale una foto del dorso.",
			confirmation: "Asegurate de que el texto esté al derecho y sea claramente legible.",
			blocked: {
				title: "No se identificó un código de barras",
				text:
					"Verificá que el código de barras esté bien enfocado. Si esta en el frente del DNI, volvé a tomar la foto anterior."
			}
		},
		explainSelfie: {
			step: 3,
			header: "Foto Selfie y Prueba de Vida",
			description: (gesture: LivenessGesture) => {
				const common =
					"Buscá una pared clara, con buena luz y parate delante. Centrate en el recuadro, y cuando te lo pida, ";
				switch (gesture) {
					case LivenessGesture.SMILE:
						return common + "sonreí.";
					case LivenessGesture.TURN_LEFT:
					case LivenessGesture.TURN_RIGHT:
						return common + "mirá al hombro que te indica la pantalla.";
					case LivenessGesture.WINK_LEFT:
					case LivenessGesture.WINK_RIGHT:
						return common + "guiñá el ojo que te indica la pantalla.";
				}
			},
			gestureExplanation: (gesture: LivenessGesture) => {
				switch (gesture) {
					case LivenessGesture.SMILE:
						return "Sonreí";
					case LivenessGesture.TURN_LEFT:
						return "Mirá a tu hombro izquierdo";
					case LivenessGesture.TURN_RIGHT:
						return "Mirá a tu hombro derecho";
					case LivenessGesture.WINK_LEFT:
						return "Guiñá tu ojo izquierdo";
					case LivenessGesture.WINK_RIGHT:
						return "Guiñá tu ojo derecho";
				}
			},
			confirmation: "Asegurate de que tu cara sea claramente visible y no esté cubierta.",
			cameraExplanation: "Enfocá tu cara"
		},
		submit: {
			header: "Validación de Identidad",
			congrats: "Se enviaran los siguientes datos a validar por ReNaPer:",
			reminder: "Recordá que tus datos son privados y no serán compartidos.",
			buttonText: "OK",
			items: {
				dni: "DNI",
				gender: "Género",
				firstNames: "Nombre(s)",
				lastNames: "Apellido(s)",
				birthDate: "Fecha de Nacimiento",
				tramitId: "Número de tramite"
			}
		},
		success: {
			header: "Validación de Identidad",
			congrats: "¡Felicitaciones! Su identidad ha sido validada.",
			reminder: "Recuerda que tus datos son privados y no serán compartidos.",
			buttonText: "OK"
		},
		failure: {
			header: "Validación de Identidad",
			congrats: "Su identidad no ha sido validada. Por favor, vuelva a intentar.",
			reminder: "Recuerda que tus datos son privados y no serán compartidos.",
			buttonText: "OK"
		}
	},
	textInput: {
		firstName: {
			description: "Nombre",
			placeholder: ""
		},
		lastName: {
			description: "Apellido",
			placeholder: ""
		},
		email: {
			description: "Email",
			placeholder: ""
		},
		verificationCode: {
			description: "Código de validación",
			placeholder: "6 dígitos"
		},
		cellPhoneNumber: {
			description: "Número de celular",
			placeholder: "código área + número sin 15"
		},
		password: {
			BASIC: "Contraseña",
			OLD: "Contraseña Actual",
			NEW: "Nueva Contraseña",
			REPEAT: "Repetir Contraseña"
		}
	},
	credentialCard: {
		emitter: {
			id: "ID Emisor: ",
			unknown: "Emisor desconocido",
			known: (name: string) => `Emisor: ${name}`,
			loading: "Cargando..."
		},
		valueNotAvailable: "N/A",
		shared: "Credencial compartida con vos",
		replaced: "Credencial no vigente por existir reemplazo",
		formatDate: formatFullDate,
		formatValue: (value: string | number | null): string => {
			if (value === null) {
				return "N/A";
			}
			const map: Partial<Record<string | number, string>> = {
				true: "Sí",
				false: "No"
			};

			const dateRegex = /\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d([+-][0-2]\d:[0-5]\d|Z)/;
			if (typeof value === "string" && value.match(dateRegex)) {
				const date = new Date(value);
				return formatDatePart(date);
			} else {
				return map[value] ?? `${value}`;
			}
		}
	},
	specialCredentials: {
		PhoneNumberData: {
			title: "Número de celular",
			phoneNumber: ""
		},
		EmailData: {
			title: "Email",
			email: ""
		},
		PersonalData: {
			title: "Datos Personales",
			dni: "DNI",
			names: "Nombre(s)",
			lastNames: "Apellido(s)",
			nationality: "Nacionalidad"
		},
		LegalAddress: {
			title: "Domicilio Legal",
			streetAddress: "Calle",
			numberStreet: "Número",
			zipCode: "Código Postal",
			city: "Ciudad/Barrio",
			province: "Provincia",
			country: "País",
			floor: "Piso",
			department: "Departamento",
			municipality: "Municipalidad"
		}
	},
	camera: {
		notAuthorized: "Cámara no autorizada",
		scanQRInstruction: "Escaneá un código QR",
		processing: "Procesando...",
		noCredentials: {
			title: "No hay credenciales",
			message: "El código QR escaneado no contiene credenciales"
		}
	},
	scanCredential: {
		barTitle: "Credenciales",
		wrongType: {
			title: "Error",
			message: "Tipo de credencial inesperado"
		},
		foreign: {
			title: "Error",
			message: "Credencial ajena recibida directamente"
		}
	},
	scanDisclosureResponse: {
		wrongFormat: "Formato inesperado en QR",
		wrongStart: "Por favor comenzá desde el primer código QR",
		wrongMaxIndex: "Este código QR pertenece a otra secuencia",
		wrongIndex: (current: number, expected: number) =>
			`Este código QR no es el esperado (actual: ${current}, esperado: ${expected})`
	},
	notifications: {
		barTitle: "Notificaciones",
		showExpired: "Mostrar solicitudes vencidas",
		hideExpired: "Ocultar solicitudes vencidas",
		sendResponse: "Enviar",
		requestExpired: "Fecha límite superada.",
		noRequestsAvailable: "No tenés nuevas notificaciones"
	},
	credentialRequestCard: {
		from: "De",
		unknown: "Solicitante desconocido",
		loading: "Cargando...",
		requesterID: "ID Solicitante",
		requests: "Solicita",
		before: "Antes de",
		formatEndDate: formatFullDate,
		formatField: (name: string): string => {
			switch (name.toLowerCase()) {
				case "names":
				case "firstnames":
				case "nombre":
					return "NOMBRE";
				case "apellido":
				case "lastnames":
					return "APELLIDO";
				case "dni":
				case "document":
					return "DNI";
				case "name":
				case "full name":
					return "NOMBRE COMPLETO";
				case "email":
					return "EMAIL";
				case "country":
				case "nationality":
					return "NACIONALIDAD";
				case "cellphone":
				case "phone":
					return "TELÉFONO";
				case "street":
				case "streetaddress":
					return "CALLE";
				case "numberstreet":
				case "addressnumber":
					return "NÚMERO DE CALLE";
				case "department":
					return "DEPARTAMENTO";
				case "floor":
					return "PISO";
				case "city":
				case "neighborhood":
					return "BARRIO";
				case "zipcode":
				case "postcode":
					return "CÓDIGO POSTAL";
				case "expiration date":
					return "FECHA DE VENCIMIENTO";
				default:
					return name;
			}
		}
	},
	credentialReceivedInScan: {
		addCredential: "¿Agregar esta credencial?",
		doAdd: "Sí",
		goBack: "No",
		alreadyScanned: "Ya tenés esta credencial"
	},
	credentialShare: {
		shareAction: "Compartir",
		noCredentialsAvailable: "Primero obtén credenciales",
		whichFull: "¿Qué credenciales deseas compartir?",
		whichMicro: "¿Qué parte de la credencial deseas compartir?",
		notCurrent: {
			title: "Credencial no vigente",
			message: "Solo es posible compartir credenciales vigentes."
		}
	},
	activityHistory: {
		CREATE: (title: string) => ({
			icon: "",
			title: "Nueva Credencial",
			description: `Se creó una nueva credencial a tu nombre: ${title}`
		}),
		RECEIVE: (title: string) => ({
			icon: "",
			title: "Recibiste Credenciales",
			description: `Te compartieron ${title}`
		}),
		SHARE: (title: string) => ({
			icon: "",
			title: "Enviaste Credenciales",
			description: `Compartiste ${title}`
		})
	},
	jwtParseError: (error: JWTParseError) => {
		switch (error.type) {
			case "AFTER_EXP":
				const displayTimestamp = (ts: number) => formatFullDate(new Date(ts * 1000));
				return {
					errorCode: `TOKEN_AFTER_EXP`,
					title: "Credencial Vencida",
					message: `Hora actual: ${displayTimestamp(error.current)}\n\nVencimiento: ${displayTimestamp(error.expected)}`
				};
			case "BEFORE_IAT":
				return {
					errorCode: `TOKEN_BEFORE_IAT`,
					title: "Error de Horario",
					message: "Esta credencial indica que fue emitida en el futuro. Verificá la hora de tu dispositivo."
				};
			case "JWT_DECODE_ERROR":
				return {
					errorCode: "TOKEN_JWT_DECODE_ERROR",
					title: "Error al Decodificar",
					message: "Error al extraer credenciales."
				};
			case "NONCREDENTIAL_WRAP_ERROR":
				return {
					errorCode: "NONCREDENTIAL_WRAP_ERROR",
					title: "Error al Verificar Credencial",
					message: "Esta credencial contiene una sub-credencial en formato desconocido. Comunicate con su emisor."
				};
			case "RESOLVER_CREATION_ERROR":
				return {
					errorCode: "TOKEN_RESOLVER_CREATION_ERROR",
					title: "Error de Conexión",
					message: "Verificá tener acceso a internet."
				};
			case "SHAPE_DECODE_ERROR":
				return {
					errorCode: "TOKEN_SHAPE_DECODE_ERROR",
					title: "Error al Interpretar Credencial",
					message: error.errorMessage
				};
			case "VERIFICATION_ERROR":
				return {
					errorCode: "TOKEN_VERIFICATION_ERROR",
					title: "Error al Verificar Credencial",
					message: "Verificá tener acceso a internet."
				};
			case "DELEGATE_CHECK_ERROR":
				return {
					errorCode: "TOKEN_DELEGATE_CHECK_ERROR",
					title: "Error al Verificar Credencial",
					message: "Verificá tener acceso a internet."
				};
			case "MISSING_DELEGATION_ERROR":
				return {
					errorCode: "TOKEN_MISSING_DELEGATION_ERROR",
					title: "Error al Verificar Credencial",
					message: "Esta credencial fue emitida por un delegado no autorizado. Comunicate con su emisor."
				};
			default:
				assertUnreachable(error);
		}
	}
};
