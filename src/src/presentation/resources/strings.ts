import { JWTParseError } from "didi-sdk";

import { assertUnreachable } from "../../util/assertUnreachable";

import { LivenessGesture } from "../dashboard/validateIdentity/LivenessGesture";

export default {
	debug: {
		menu: "Debug Menu",
		decodeJWT: "Decodificar JWT",
		serviceConfig: {
			barTitle: "Configuracion de Servicios",
			instructions: "Dejar un input vacio y guardar lo retorna a su valor por defecto"
		},
		screenInProgress: "Pantalla en Construccion"
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
			}
		},
		identity: {
			category: "Documento Identidad",
			subTitle: "Nombre"
		},
		validateIdentity: {
			startButtonTitle: "Validar Id",
			successButtonTitle: "Éxito",
			failureButtonTitle: "Reintentar",
			validating: "Validación en progreso..."
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
		documents: "Ver Documentos",
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
			emailMessage: "E-mail",
			documentMessage: "DU / CI / Pasaporte",
			nationalityMessage: "Nacionalidad",
			addressMessage: "Domicilio",

			streetMessage: "Nombre de Calle / Manzana",
			numberMessage: "Número / Casa",
			departmentMessage: "Departamento",
			floorMessage: "Piso",
			neighborhoodMessage: "Barrio",
			postCodeMessage: "Codigo Postal"
		},
		changePassword: {
			barTitle: "Cambio de Contraseña",
			explanation: "Ingresa tu contraseña actual y tu nueva contraseña",
			requirementHeader: "Tu nueva contraseña debe tener:",
			indicator: {
				missing: "- ",
				ok: "✓ "
			},
			requirements: {
				PASSWORD_TOO_SHORT: "8 o mas caracteres",
				PASSWORD_MISSING_UPPERCASE: "1 o mas mayusculas",
				PASSWORD_MISSING_LOWERCASE: "1 o mas minusculas",
				PASSWORD_MISSING_NUMBER: "1 o mas numeros",
				PASSWORD_MISSING_SPECIAL: "1 o mas caracteres especiales"
			},
			mismatch: "Las contraseñas no coinciden",
			changePassword: "Cambiar Contraseña"
		},
		share: {
			barTitle: "Compartir",
			share: "Compartir",

			personalData: "DatosPersonales",
			familyMessage: "Familia",
			coursesMessage: "Cursos",
			jobsMessage: "Trabajos",
			titlesMessage: "Títulos",
			othersMessage: "Otros"
		},
		changeEmail: {
			screenTitle: "Cambiar Email",
			messageHead: "Ingresa tu nuevo email y tu contraseña actual."
		},
		changePhone: {
			screenTitle: "Cambiar Teléfono",
			messageHead: "Ingresa tu nuevo numero de telefono y tu contraseña actual."
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
			messageHead: "Ingresa tu email y contraseña",
			forgotPasswordMessage: "No recuerdo la contraseña"
		},
		explanation: {
			messageMotivesTitle: "Si quieres recuperar la cuenta es porque:",
			messageMotives: ["Te robaron el teléfono", "Cambiaste tu nro. de teléfono", "Perdiste tu teléfono"],
			rememberEmailMessage: "Debes recordar tu email y contraseña de resguardo para recuperar tu cuenta",
			startButtonText: "Iniciar"
		},
		passwordRecover: {
			messageHead: "Recuperar Contraseña"
		},
		passwordRecoverEmailSent: {
			message: "Se te ha enviado un email para comenzar el proceso de recuperación de su contraseña",
			buttonText: "Ver mis E-mails"
		},
		passwordRecoverConfirmationCode: {
			messageHead: "Ingrese el código enviado por email",
			buttonText: "OK"
		},
		passwordChange: {
			barTitle: "Recuperar Contraseña",
			messageHead: "Ingresa tu nueva contraseña"
		}
	},
	signup: {
		barTitle: "Registro",
		onboarding: {
			close: "Cerrar"
		},
		enterPhone: {
			messageHead: "Ingresa tu teléfono para registrarte en la aplicación"
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
			messageHead:
				"Ingrese su email y una contraseña para que pueda recuperar su Identidad Digital en caso de perder el teléfono.",
			backupGenerate: "Generar Backup"
		},
		registrationEmailSent: {
			message:
				"Recibirás un email para validar tu cuenta. Ingresa el código de 6 dígitos para verificar tu email y así completar la generación del backup de tu identidad"
		},
		registrationValidated: {
			message: "Su E-mail ha sido validado y su Identidad Digital ha sido resguardada.",
			buttonEnter: "Ingresar a Didi"
		}
	},
	login: {
		messageHead: "Ingresa tu email y contraseña",
		buttonText: "Ingresar"
	},
	accessCommon: {
		validateButtonText: "Validar",
		recoverButtonText: "Registrar",
		defaultPlace: "Otros",
		enterPhone: {
			messageHead: "Carga tu número de celular"
		},
		verify: {
			phoneMessageHead: "Ingresa el código de 6 dígitos para verificar tu celular",
			emailMessageHead: "Ingresa el código de 6 dígitos para verificar tu email",
			resendCode: "¿No recibiste el código?"
		}
	},
	documents: {
		barTitle: "Mis Documentos",
		detailBarTitle: "Documento",
		filterAll: "Todos",
		filterLivingPlace: "Vivienda",
		filterIdentity: "Identidad"
	},
	tabNames: {
		home: "Inicio",
		rounds: "Rondas",
		documents: "Documentos",
		settings: "Configuración"
	},
	settings: {
		idLabel: "ID:",
		identityBackup: "Copia de Seguridad",
		changePassword: "Cambio de Contraseña",
		about: "Acerca de Didi",
		endSession: "Cerrar Sesion"
	},
	share: {
		title: "Compartir",
		explanation: "Escanea el siguiente codigo QR con otra aplicación Didi",
		shareTitle: "Credencial Didi",
		shareLink: "Compartir Enlace"
	},
	disclose: {
		title: "Compartir",
		explanation: "Escanea el siguiente codigo QR con la aplicación Didi que te envió la solicitud"
	},
	services: {
		changePasswordSuccess: "Contraseña cambiada exitosamente.",
		changePhoneSuccess: "Número de telefono cambiado exitosamente.",
		changeEmailSuccess: "Email cambiado exitosamente."
	},
	validateIdentity: {
		header: "Validar Identidad",
		welcome: "Te damos la bienvenida",
		step: "Paso",
		stepTotal: "/3",
		what: {
			header: "¿Que es validación de identidad?",
			description:
				"Es un simple proceso mediante el cual vas a poder confirmar que vos sos quien decis ser. Y con ello, podrás acceder a todos los servicios de la APP.",
			buttonText: "Siguiente"
		},
		howTo: {
			header: "¿Como lo hago?",
			intro: "Sigue estos pasos:",
			steps: ["Busca un lugar iluminado y con fondo claro", "Tene tu DNI a mano", "Acceso a internet o datos moviles"],
			buttonText: "Comencemos"
		},
		explainFront: {
			step: 1,
			header: "Digitalizando el DNI",
			description:
				"A continuación tendremos que sacar una foto al frente de tu DNI. Cuando lo tengas a mano, hacé click en el ícono de la cámara.",
			confirmation: "Asegurá que el texto este al derecho y sea claramente legible."
		},
		explainBack: {
			step: 2,
			header: "Digitalizando el DNI",
			description: "Ahora da vuelta el DNI y sácale una foto del dorso.",
			confirmation: "Asegurá que el texto este al derecho y sea claramente legible."
		},
		explainSelfie: {
			step: 3,
			header: "Foto Selfie y Prueba de Vida",
			description: (gesture: LivenessGesture) => {
				const common =
					"Busca una pared clara, con buena luz y parate delante. Centrate en el recuadro, y cuando lo diga, ";
				switch (gesture) {
					case LivenessGesture.SMILE:
						return common + "sonrie.";
					case LivenessGesture.TURN_LEFT:
						return common + "mira a tu hombro izquierdo.";
					case LivenessGesture.TURN_RIGHT:
						return common + "mira a tu hombro derecho.";
					case LivenessGesture.WINK_LEFT:
						return common + "guiña tu ojo izquierdo.";
					case LivenessGesture.WINK_RIGHT:
						return common + "guiña tu ojo derecho.";
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
			confirmation: "Asegurá que tu cara sea claramente visible y no este cubierta.",
			cameraExplanation: "Enfoca tu cara"
		},
		submit: {
			header: "Validación de Identidad",
			congrats: "Se enviaran los siguientes datos a validar por ReNaPer:",
			reminder: "Recuerda que tus datos son privados y no serán compartidos.",
			buttonText: "OK"
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
			description: "E-mail",
			placeholder: ""
		},
		verificationCode: {
			description: "Código de validación",
			placeholder: "6 dígitos"
		},
		cellPhoneNumber: {
			description: "Número de celular",
			placeholder: "código area + número sin el 15"
		},
		password: {
			BASIC: "Contraseña",
			OLD: "Contraseña Actual",
			NEW: "Nueva Contraseña",
			REPEAT: "Repetir Contraseña"
		}
	},
	credentialCard: {
		emitter: "Emisor: ",
		valueNotAvailable: "N/A",
		replaced: "Credencial no vigente por existir reemplazo"
	},
	specialCredentials: {
		PhoneNumberData: {
			title: "Número de celular",
			phoneNumber: ""
		},
		EmailData: {
			title: "E-mail",
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
		notAuthorized: "Camara no autorizada",
		scanQRInstruction: "Escanea un codigo QR"
	},
	notifications: {
		showExpired: "Mostrar peticiones vencidas",
		hideExpired: "Ocultar peticiones vencidas",
		sendResponse: "Enviar",
		requestExpired: "Fecha límite superada."
	},
	credentialRequestCard: {
		from: "De",
		requests: "Solicita",
		before: "Antes de"
	},
	credentialReceivedInScan: {
		addCredential: "¿Agregar esta credencial?",
		doAdd: "Si",
		goBack: "No",
		alreadyScanned: "Ya dispones de esta credencial"
	},
	credentialShare: {
		shareAction: "Compartir",
		noCredentialsAvailable: "Primero obten credenciales",
		whichFull: "¿Qué credenciales deseas compartir?",
		whichMicro: "¿Qué parte de la credencial deseas compartir?",
		notCurrent: {
			title: "Credencial no vigente",
			message: "Solo es posible compartir credenciales vigentes."
		}
	},
	jwtParseError: (error: JWTParseError) => {
		switch (error.type) {
			case "AFTER_EXP":
				const displayTimestamp = (ts: number) => new Date(ts * 1000).toLocaleString();
				return {
					errorCode: `TOKEN_AFTER_EXP`,
					title: "Credencial Vencida",
					message: `Hora actual: ${displayTimestamp(error.current)}, Vencimiento: ${displayTimestamp(error.expected)}`
				};
			case "BEFORE_IAT":
				return {
					errorCode: `TOKEN_BEFORE_IAT`,
					title: "Error de Horario",
					message: "Esta credencial indica que fue emitida en el futuro. Verifique la hora de su dispositivo."
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
					message: "Esta credencial contiene una sub-credencial en formato desconocido."
				};
			case "RESOLVER_CREATION_ERROR":
				return {
					errorCode: "TOKEN_RESOLVER_CREATION_ERROR",
					title: "Error de Conexión",
					message: "Verifique tener acceso a internet."
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
					message: "Verifique tener acceso a internet."
				};
			default:
				assertUnreachable(error);
		}
	}
};
