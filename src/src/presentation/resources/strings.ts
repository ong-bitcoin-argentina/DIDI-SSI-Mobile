export default {
	dashboard: {
		recentActivities: {
			label: "Actividades recientes",
			loadMore: "Cargar más"
		},
		userData: {
			personalDataLabel: "Datos personales",
			states: {
				approved: "Aprobado",
				pending: "Pendiente",
				rejected: "Rechazado"
			},
			editProfile: {
				barTitle: "Editar Perfil",
				nameMessage: "Nombre completo",
				cellMessage: "Celular",
				emailMessage: "E-mail",
				documentMessage: "DU / CI / Pasaporte",
				nacionalityMessage: "Nacionalidad",
				addressMessage: "Domicilio",
				saveChanges: "Guardar Cambios"
			},
			changePassword: {
				barTitle: "Cambio Contraseña",
				newPassMessage: "Nueva Contraseña",
				repeatNewPassMessage: "Repetir Contraseña",
				oldPassMessage: "Contraseña Actual",
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
			}
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
			emailTitle: "E-mail",
			passwordTitle: "Password",
			forgotPasswordMessage: "No recuerdo la contraseña"
		},
		explanation: {
			messageMotivesTitle: "Si quieres recuperar la cuenta es porque:",
			messageMotives: ["Te robaron el teléfono", "Cambiaste tu nro. de teléfono", "Perdiste tu teléfono"],
			rememberEmailMessage: "Debes recordar tu email y contraseña de resguardo para recuperar tu cuenta",
			startButtonText: "Iniciar"
		},
		passwordRecover: {
			messageHead: "Recuperar Contraseña",
			emailTitle: "E-mail",
			forgotPasswordMessage: "No recuerdo la contraseña"
		},
		passwordRecoverEmailSent: {
			message: "Se te ha enviado un email para comenzar el proceso de recuperación de su contraseña",
			buttonText: "Ver mis E-mails"
		},
		passwordRecoverConfirmationCode: {
			messageHead: "Ingrese el código enviado por email",
			codeTitle: "Código de validación",
			buttonText: "OK"
		},
		passwordChange: {
			barTitle: "Recuperar Contraseña",
			messageHead: "Ingresa tu nueva contraseña",
			newPassMessage: "Nueva Contraseña",
			repeatNewPassMessage: "Repetir Contraseña",
			oldPassMessage: "Contraseña Actual"
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
		enterEmail: {
			messageHead:
				"Ingrese su email y una contraseña para que pueda recuperar su Identidad Digital en caso de perder el teléfono.",
			emailTitle: "E-mail",
			passwordTitle: "Password",
			repeatPasswordTitle: "Repetir Contraseña",
			backupGenerate: "Generar Backup"
		},
		registrationEmailSent: {
			message:
				"Recibirá un email para validar su cuenta. Deberá hacer click en el link y así completar la generación del backup de su identidad",
			buttonText: "Ver mis E-mails"
		},
		registrationValidated: {
			message: "Su E-mail ha sido validado y su Identidad Digital ha sido resguardada.",
			buttonEnter: "Ingresar a Didi"
		}
	},
	accessCommon: {
		validateButtonText: "Validar",
		recoverButtonText: "Registrar",
		place: "Argentina +54",
		enterPhone: {
			messageHead: "Carga tu número de celular",
			cellPlaceholder: "011 + número sin el 15",
			cellNumber: "Número de celular"
		},
		verifyPhone: {
			messageHead: "Ingresa el código de 6 dígitos para verificar tu celular",
			codeTitle: "Código de validación",
			codePlaceholder: "6 dígitos",
			resendCode: "¿No recibiste el código?"
		}
	},
	documentFilters: {
		all: "Todos",
		livingPlace: "Vivienda",
		identity: "Identidad"
	},
	tabNames: {
		home: "Inicio",
		rounds: "Rondas",
		documents: "Documentos",
		settings: "Configuración"
	},
	settings: {
		account: "Cuenta",
		preferences: "Preferencias de Didi",
		about: "Acerca de Didi"
	},
	validateIdentity: {
		header: "Validar Identidad",
		welcome: "Bienvenida Lili M.",
		what: {
			header: "¿Que es validación de identidad?",
			description:
				"Es un simple proceso mediante el cual vas a poder confirmar que vos sos quien decis ser. Y con ello, podrás acceder a todos los servicios de la APP.",
			buttonText: "Siguiente"
		},
		howTo: {
			header: "¿Como lo hago?",
			intro: "Sigue estos pasos",
			steps: ["Busca un lugar iluminado y con fondo claro", "Tene tu DNI a mano", "Acceso a internet o datos moviles"],
			buttonText: "Comencemos"
		},
		explainFront: {
			title: "Paso 1/4",
			header: "Digitalizando el DNI",
			description:
				"A continuación tendremos que sacar una foto al frente de tu DNI. Cuando lo tengas a mano, hacé click en el ícono de la cámara."
		},
		explainBack: {
			title: "Paso 2/4",
			header: "Digitalizando el DNI",
			description: "Ahora da vuelta el DNI y sácale una foto del dorso."
		}
	}
};
