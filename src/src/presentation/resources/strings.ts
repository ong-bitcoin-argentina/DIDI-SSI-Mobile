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
				cellPhone: "Celu",
				email: "Mail",
				document: "ID"
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
		place: "Argentina +54",
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
		title: "Credencial Didi",
		explanation: "Escanea el siguiente codigo QR con otra aplicacion Didi",
		shareLink: "Compartir Enlace"
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
		stepTotal: "/4",
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
			header: "Foto Selfie",
			description: "Busca una pared clara, con buena luz y parate delante. Ponte lindo y sacate una selfie.",
			confirmation: "Asegurá que tu cara sea claramente visible y no este cubierta."
		},
		explainLiveness: {
			step: 4,
			header: "Prueba de Vida",
			description:
				"Es muy simple! Mira tu hombro izquierdo y cuando escuches un pitido voltea la vista al frente y listo!!",
			confirmation: "Asegurá que tu cara sea claramente visible y no este cubierta."
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
			placeholder: "011 + número sin el 15"
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
		valueNotAvailable: "N/A"
	},
	specialCredentials: {
		PhoneNumberData: {
			title: "Número de celular",
			phoneNumber: "Número de celular"
		},
		EmailData: {
			title: "E-mail",
			email: "E-mail"
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
		noCredentialsAvailable: "Primero obten credenciales",
		whichFull: "¿Qué credencial deseas compartir?",
		whichMicro: "¿Qué parte de la credencial deseas compartir?"
	}
};
