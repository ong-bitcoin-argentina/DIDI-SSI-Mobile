

import { StyleSheet } from "react-native";
import { JWTParseError } from "@proyecto-didi/app-sdk";

import { assertUnreachable } from "../../util/assertUnreachable";

import { gestures, LivenessGesture, TypeGestures } from "../dashboard/vuIdentity/LivenessGesture";

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
	return `${date.getDate()} de ${months[date.getMonth()]} de ${date.getFullYear()}`;
}

function formatHourPart(date: Date) {
	const pad = (n: number) => (n < 10 ? `0${n}` : n);
	return `${pad(date.getHours())}:${pad(date.getMinutes())}:${pad(date.getSeconds())}`;
}

function formatFullDate(date: Date) {
	return `${formatDatePart(date)}, ${formatHourPart(date)}`;
}

function specialFullData(date: Date) {
	const pad = (n: number) => (n < 10 ? `0${n}` : n);
	return `${date.getDate()}/${date.getMonth()}/${date.getFullYear()}  ${pad(date.getHours())}:${pad(date.getMinutes())}hrs`;
}

function formatDate(date: Date) {
	const pad = (n: number) => (n < 10 ? `0${n}` : n);
	return `${pad(date.getDate())}/${pad(date.getMonth())}/${pad(date.getFullYear())}`;
}

const appName = "ai·di";

const styles = StyleSheet.create({
	bold: {
		fontWeight: "bold"
	}
});

export default {
	appName,
	actions: {
		copied: "Copiado"
	},
	buttons: {
		accept: "Aceptar",
		acceptAlternative: "Acepto",
		ok: "OK",
		cancel: "Cancelar",
		close: "Cerrar",
		reject: "Rechazar",
		send: "Enviar",
		ready: "Listo",
		back: "Volver"
	},
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
				title: `Validá tu DNI para completar tu Perfil ${appName}.`,
				subtitle: null,
				button: "Validar DNI"
			},
			Success: {
				title: "¡Felicitaciones! Su DNI ha sido validado.",
				subtitle: "Recuerde que sus datos son privados.",
				button: "OK"
			},
			Failed: {
				title: "Lo lamentamos. Su identidad no ha sido validada.",
				subtitle: "Intente nuevamente.",
				button: "Reintentar"
			},
			Finished: {
				title: null,
				subtitle: null
			},
			"In Progress": {
				title: "Validando tus datos..., este proceso puede demorar unos minutos...",
				subtitle: null,
				button: null
			}
		},
		recentActivities: {
			label: "Actividades recientes",
			loadMore: "Cargar más"
		},
		issuers: {
			label: "Lista de Issuers",
			loadMore: "Cargar más"
		},
		authModal: {
			detail: (targetApp: string) =>
				`${appName} compartirá esta información con ${targetApp}: Nombre, apellido, número de celular, mail, número de identificación digital (DID) y foto de usuario.`,
			title: `Permitir acceso desde ${appName}`,
			titleHas: "Acceso validado por",
			connecting: "Conectándote a ronda..."
		}
	},
	dashboardJump: {
		scanCredential: "Escanear Credenciales",
		shareCredential: "Compartir",
		createRound: "Armar Ronda",
		documents: "Ver Credenciales",
		identity: "Ver ID",
		editProfile: "Mi Perfil"
	},
	userData: {
		barTitle: "Mi perfil",
		personalDataLabel: "Datos personales",
		addressDataLabel: "Domicilio Legal",
		activeIdentity: "Identidad activa (DID)",
		actions: {
			copy: "Copiar DID"
		},
		formatDate: specialFullData,
		standbyState:{
			approved: "Actualizado",
			pending: "Actualizando",
		},
		states: {
			approved: "Aprobado",
			pending: "Pendiente",
			rejected: "Rechazado"
		},
		editProfile: {
			barTitle: "Mi Perfil",
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
			postCodeMessage: "Código Postal",
			configuration: "Configuración"
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
				PASSWORD_MISSING_NUMBER: "Números"
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
				"Recibirás un email para validar tu cuenta. Ingresá el código de 6 dígitos para verificar tu email. Luego, ingresa una contraseña para tu cuenta.",
			registerDetail: `Registrándote en ${appName}, aceptás nuestros `,
			terms: "Términos y Condiciones",
			policies: "Políticas de Privacidad"
		},
		registrationValidated: {
			message: "Tu email fue validado con éxito y tu Identidad Digital fue resguardada.",
			buttonEnter: `Ingresar a ${appName}`
		},
		reset: {
			message: "Este dispositivo tiene registrada otra cuenta. Para reemplazarla...",
			messageRecover: `Si ya tenés una cuenta en ${appName} y querés recuperarla, solo tenés que importarla a este dispositivo.`,
			cancel: "Salir sin cambios",
			register: "Registrá una cuenta nueva",
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
			countryCode: "Código de País",
			countryPicker: "Seleccionar Código de País"
			
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
		passwordDescription:
			"Usá ocho caracteres como mínimo con una combinación de números, letras mayúsculas y minúsculas."
	},
	documents: {
		barTitle: "Mis Credenciales",
		detailBarTitle: "Credencial",
		emptyFilter: "Todavía no hay credenciales de esta categoría",
		filterAll: "Todos",
		filterEducation: "Educación",
		filterLivingPlace: "Vivienda",
		filterFinance: "Finanzas",
		filterIdentity: "Identidad",
		filterShared: "Compartidos",
		filterBenefits: "Beneficios",
		filterWork: "Laboral"
	},
	tabNames: {
		home: "Inicio",
		rounds: "ronda",
		documents: "Credenciales",
		settings: "Configuración",
		semillas: "Semillas",
		issuers: "Lista de Issuers",
		identity: "Validar Identidad",
		coopsol: "Coopsol"
	},
	rounds: {
		title: "Accedé a ronda",
		titleHasRonda: "Ver mis rondas",
		description: "Organizá y participá de rondas, juntas, vaquitas o pasanakus de forma fácil y segura.",
		completeData: "Por favor, completá tus datos para acceder a ronda.",
		descriptionHasRonda:
			"Hacé un seguimiento de tus rondas activas y unite o creá nuevas rondas, juntas, vaquitas o pasanakus de forma fácil y segura.",
		dataConfirmed: "Tu datos fueron guardados de forma correcta, podes seguir usando la aplicación."
	},
	coopsol:{
		program: "Programa Coopsol",
		detailBarTitle: "Programa Coopsol",
		detailFirst: "Ahora podés tener tus credenciales que certifican y validan tus datos personales, financieros y productivos.",
		detailSecond: "Las credenciales son privadas, con ellas vas a poder guardar y proteger tu información de manera segura y confiable.",
		detailThird: "Las podes llevar con vos a donde quieras y compartirlas con quien quieras.",
		getCredentials: "Acceder a Mis Credenciales",
		validationTitle: "Validación de Identidad - Coopsol",
		noCoopsolIdentity: {
			first: "Parece que aún no tenés tus credenciales de Identidad Coopsol.",
			second: "Recordá que si las solicitaste recientemente, esto puede demorar hasta 5 (cinco) días. Ante cualquier consulta, contactate con tu asesor/a."
		},
		credentialsSuccess: "Pronto vas a recibir tus credenciales de Coopsol. Este proceso puede demorar unos días...",
		validate: {
			successRequest: "La solicitud de validación de DNI se registró de manera correcta, pronto tendrás novedades.",
			description: "Validación de Identidad",
			needData: "COOPSOL",
			willBeContacting: "Se van a estar contactando con vos para completar el proceso de validación.",
			DNI: "Validar DNI con Coopsol",
			identityFromCoopsol: "Validar Identidad a través de Coopsol",
			descriptionSharing: "Se van a estar contactando con vos para completar el proceso de validación.",
			willBeContactingBrevity: "Una vez que tengas Credencial de Identidad en tu billetera podrás solicitar credenciales de Coopsol.",
			
			coopsolProcessing: "Sus credenciales van a ser emitidas en los proximos minutos.",
			coopsolContacting: "Recibirá una notificación cuando haya recibido las credenciales.",
			coopsolRecommendation: "Para visualizarlas cierre y abra esta aplicación.",


			shouldDo: "Debes completar la validación de Identidad para acceder a los beneficios de Coopsol.",
			renaperFailed: "Lo lamentamos. Su identidad no ha sido validada.",	
			question: "¿No lográs validar tu identidad?",
			rememberYouCan: "Recordá que siempre vas a poder",
			gettingState: "Obteniendo el estado de tu validación, por favor aguarde.",
			rejected:"Tu solicitud de validación de identidad ha sido rechazada por Coopsol. Por favor, contactate con tu asesor/a.",
			aprroved: "Sus credenciales emitidas pueden ser visualizadas en la sección de Credenciales que se encuentra en el menú principal. "
		}
	},
	semillas: {
		barTitle: "Mis Credenciales semillas",
		benefitCredentialActive: "Credencial de Beneficios activa",
		detailBarTitle: "Programa Semillas",
		validationTitle: "Validación de Identidad - Semillas",
		getCredentials: "Quiero mis credenciales",
		noDni: "Debes completar el proceso de validación de identidad antes de poder acceder a los Beneficios de Semillas.",
		credentials: "Credenciales",
		program: "Programa Semillas",
		writeEmail: "Escribe la dirección de email de tu contacto para compartir tus credenciales de Semillas:",

		detailFirst:
			"Si sos parte del programa Semillas ahora podés tener tus credenciales que certifican y validan tus datos personales.",
		detailSecond:
			"Tus credenciales son privadas, con ellas vas a poder guardar y proteger tu información de manera segura y confiable.",
		detailThird:
			"Gracias a que son portables, las podés llevar con vos, acceder a ellas siempre que lo necesites y compartirlas sólo con quien vos quieras.",
		credentialsSuccess: "Pronto vas a recibir tus credenciales de Semillas. Este proceso puede demorar unos días...",
		credetialsPending:
			"Tus Credenciales de Beneficios Semillas ya han sido solicitadas y se encuentran en proceso... Pronto podrás acceder a los Beneficios de Semillas!!",
		noSemillaIdentity: {
			first: "Parece que aún no tenés tus credenciales de Identidad Semillas.",
			second:
				"Recordá que si las solicitaste recientemente, esto puede demorar hasta 5 (cinco) días. Ante cualquier consulta, contactate con tu asesor/a."
		},
		steps: {
			first: {
				title: "¿A qué servicio querés acceder?",
				email: "¿No encontrás tu servicio?",
				writeEmail: "Mail del destinatario",
				noCredentials: "Para poder acceder a los Servicios debes tener tu Credencial de Beneficios Semillas activa"
			},
			second: {
				title: "Elegí quién va a usar el beneficio:",
				description: "Recordá que podés utilizarlo con tus familiares registrados en Semillas.",
				detail: "Seleccioná quién lo usará",
				modalTitle: (prestador: string) =>
					`Estás por compartir la siguiente información con ${prestador} y con Semillas`,
				labels: {
					dni: "DNI",
					name: "Nombre y Apellido",
					birth: "Fecha de Nacimiento",
					character: "Carácter",
					mail: "Email",
					phone: "Teléfono"
				}
			},
			third: {
				title: "¡El beneficio fue solicitado con éxito!",
				needCoordinate: "¿Necesitás coordinar tu turno?",
				willBeContacted: "Serás contactado a la brevedad.",
				whatsappMessage: "¡Hola! Pertenezco al programa Semillas y quisiera solicitar un turno.",
				whatsappError: "Ocurrió un error al abrir Whatsapp, confirme que lo tiene instalado en su dispositivo."
			}
		},
		shareMessage: `${appName} quiere compartir tu código de usuario y número de DNI con Semillas para confirmar tus credenciales.`,
		call: "Llamar",
		whatsApp: "WhatsApp",
		accept: "Ok",
		errorShareData: "Ocurrió un error al compartir tus datos",
		validate: {
			shouldDo: "Debes completar la validación de Identidad para acceder a los beneficios de Semillas.",
			renaperFailed: "Lo lamentamos. Su identidad no ha sido validada.",
			identityFromSemillas: "Validar Identidad a través de Semillas",
			DNI: "Validar DNI con Semillas",
			question: "¿No lográs validar tu identidad?",
			description: "Si estás teniendo dificultades para validar tu identidad, lo podes realizar a través de Semillas.",
			descriptionSharing: "Estás por compartir la siguiente información con Semillas:",
			needData: "Para ello, es necesario que completes los siguientes datos:",
			willBeContacting: "Se van a estar contactando con vos para completar el proceso de validación.",
			willBeContactingBrevity: "Se van a estar contactando con vos a la brevedad.",
			semillasProcessing: "Tu solicitud de validación de identidad está siendo procesada por Semillas.",
			semillasContacting: "En estos días se contactarán con vos para completar el proceso.",
			rememberYouCan: "Recordá que siempre vas a poder",
			successRequest: "La solicitud de validación de DNI se registró de manera correcta, pronto tendrás novedades.",
			gettingState: "Obteniendo el estado de tu validación, por favor aguarde.",
			rejected:
				"Tu solicitud de validación de identidad ha sido rechazada por Semillas. Por favor, contactate con tu asesor/a.",
			aprroved: "Tu solicitud fue validada correctamente!"
		}
	},
	settings: {
		idLabel: "ID:",
		identityBackup: "Copia de Seguridad",
		changePassword: "Contraseña",
		editProfile: "Editar Perfil",
		myProfile: "Mi Perfil",
		changePhone: "Cambiar Teléfono",
		changeEmail: "Cambiar E-mail",
		aboutAidi: "Acerca de ai·di",
		aboutRonda: "Acerca de ronda",
		about: {
			title: `Acerca de ${appName}`,
			paragraphs: [
				[
					{
						style: styles.bold,
						text: appName
					},
					{
						style: {},
						text:
							" es una solución tecnológica de identidad digital descentralizada mediante modelos de Blockchain desarrollada en el marco del"
					},
					{
						style: styles.bold,
						text: " Proyecto DIDI, Identidad Digital para la inclusión."
					}
				],
				[
					{
						style: {},
						text: "A través de la app "
					},
					{
						style: styles.bold,
						text: appName
					},
					{
						style: {},
						text:
							", podrás construir una identidad digital que certifique y valide datos sociales, cívicos y económicos, por medio de credenciales verificables emitidas por terceros (instituciones o individuos) con información que acredita que sos portadora o portador de ciertos atributos que tienen que ver con tu identidad."
					}
				],
				[
					{
						style: styles.bold,
						text: appName
					},
					{
						style: {},
						text:
							" utiliza el protocolo de credenciales verificables de la identidad digital auto soberana (SSI) cuyos estándares fueron definidos por World Wide Web Consortium (W3C), de manera que el usuario pueda resguardar su información de forma privada asegurando los requisitos de privacidad, control, portabilidad a su vez que garantiza integridad de los datos y autenticidad de emisor."
					}
				]
			]
		},
		aboutRondaParagraphs: [
			[
				{
					style: styles.bold,
					text: "ronda"
				},
				{
					style: {},
					text:
						" es una aplicación de Proyecto DIDI creada para jugar rondas, vaquitas, juntas o pasanakus de forma rápida, fácil y segura."
				}
			],
			[
				{
					style: {},
					text:
						"Podés crear rondas con quién vos quieras, por el monto y el tiempo que elijan y hacer un seguimiento de cada ronda, los turnos y días de pago."
				}
			],
			[
				{
					style: {},
					text:
						"Además tu participación queda registrada en la app a través de credenciales que validan tu capacidad de pago y tu reputación de buen pagador o pagadora. Al utilizar la tecnología "
				},
				{
					style: styles.bold,
					text: "blockchain"
				},
				{
					style: {},
					text: ", todos los datos y registros almacenados son privados y seguros."
				}
			]
		],
		endSession: "Cerrar Sesión"
	},
	share: {
		title: "Compartir",
		generating: "Generando código QR...",
		next: "Ya compartí el código QR",
		shareTitle: `Credencial ${appName}`,
		explanation:
			"Pedile al receptor que escanee este código QR para empezar a compartir tus credenciales.\n\nUna vez hecho esto, le aparecerá un código nuevo al receptor. Avanzá a la próxima pantalla para escanear su código."
	},
	shareResp: {
		title: "Compartir",
		shareTitle: `Credenciales Compartidas con Emisor`,
		explanation:
			"Las credenciales seleccionadas han sido compartidas con el Emisor. \n\nSi han sido las credenciales solicitadas recibirá sus credenciales en el transcurso del día. \n\nSi no recibe sus credenciales probablemente le faltó compartir las que solicita el emisor y el pedido fue rechazado."
	},
	shareExplanation: {
		title: "Compartir",
		explanation:
			"¿Cómo compartirás estas credenciales?\n\nEl receptor podrá verificar que las credenciales fueron enviadas intencionalmente y desde tu cuenta",
		direct: {
			button: `Directo a otra App ${appName}`,
			explanation: "Verificado como parte del proceso"
		},
		or: "ó",
		link: {
			button: "Compartir enlace"
		},
		shareMessage: (sharedUri: string) => `Te comparto mis Credenciales desde la App de ${appName}:\n\nEste link o acceso a la credencial compartida tiene una duración de 72 hrs.  Una vez pasado ese período debe compartir nuevamente la credencial para brindar acceso. \n${sharedUri}`
	},
	disclose: {
		title: "Compartir",
		request: {
			explanation: `Escaneá el siguiente código QR con la App ${appName} que te está compartiendo sus credenciales.`,
			next: "Siguiente"
		},
		response: {
			explanation: `Escaneá el siguiente código QR con la App ${appName} con la que estás compartiendo tus credenciales.`,
			error: `Ocurrió un error al compartir tus credenciales, por favor, regresá a la pantalla anterior para volver a intentarlo.`
		}
	},
	services: {
		changePasswordSuccess: "Contraseña cambiada exitosamente.",
		changePhoneSuccess: "Número de teléfono cambiado exitosamente.",
		changeEmailSuccess: "Email cambiado exitosamente."
	},
	vuIdentity:{
		header: "Validar Identidad",
		welcome: "Bienvenido/a",
		what: {
			header: "¿Qué es la validación de identidad?",
			description: `Es un proceso simple mediante el cual vas a poder confirmar que vos sos quien decís ser. De esta forma, podras acceder a todos los servicios de ${appName}.`,
			buttonText: "Siguiente"
		},
		howTo: {
			header: "Comienzo de proceso de validación de su Identidad",
			intro: "Asegúrate de contar con:",
			steps: [
				"Un lugar iluminado y con fondo claro",
				"Tu DNI a mano",
				"Acceso a internet o datos móviles"
			],
			buttonText: "Está listo/a?"
		},
		explainFront: {
			step: 1,
			header: "Digitalizando el DNI",
			description:"A continuación tendremos que sacar una foto al frente de tu DNI. Cuando lo tengas a mano, hacé click en el ícono de la cámara.",
			confirmation: "Asegurate de que el texto esté al derecho y sea claramente legible.",
			barcodeConfirmation: {
				found: "Se identificó el código de barras.",
				notFound: "No se identificó un código de barras. Si está de este lado del DNI, volvé a tomar la foto."
			},
			rejected: "la foto fue rechazada por favor verifique que los margen del carnet coincida, con lo que le indica la cámara",
			vuResponseFront:{
				confirmation:"success",
				notConfirmed:"camera-error"
			},
			blocked: {
				title: "No se identificó un código de barras",
				text: "Verificá que el código de barras esté bien enfocado. Si esta en el frente del DNI, volvé a tomar la foto."
			}
		},
		explainBack: {
			step: 2,
			header: "Digitalizando el DNI",
			description: "Ahora da vuelta el DNI y sacale una foto del dorso.",
			confirmation: "Asegurate de que el texto esté al derecho y sea claramente legible.",
			vuResponseBack:{
				confirmation:"success",
				notConfirmed:"camera-error"
			},
			blocked: {
				title: "Surgio un inconveniente al agregar la Foto.",
				text: "Verificá que el código de barras esté bien enfocado. Si esta en el frente del DNI, volvé a tomar la foto anterior."
			},
		},
		explainSelfie: {
			step: 3,
			header: "Foto Selfie y Prueba de Vida",
			description: (gesture: LivenessGesture) => {
				const common =
					"Buscá una pared clara, con buena luz y parate delante. Centrate en el recuadro, y cuando te lo pida, ";
				switch (gesture) {
					case LivenessGesture.TURN_LEFT:
					case LivenessGesture.TURN_RIGHT:
						return common + "mirá al hombro que te indica la pantalla.";
					case LivenessGesture.SMILE:
						return common + "sonreí.";
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
			cameraExplanation: "Enfocá tu cara",
		},
		submit: {
			header: "Validación de Identidad",
			congrats: "Se enviarán los siguientes datos a validar por VU Security",
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
			congrats: "¡Felicitaciones! Tu identidad ha sido validada.",
			reminder: "El proceso de emisión de su credencial se realizará en el transcurso del día. \n \nRecordá que tus datos son privados y no serán compartidos.",
			buttonText: "OK"
		},
		failure: {
			retryButton: "Reintentar",
			header: "Validación de Identidad",
			congrats: "Tu identidad no ha sido validada. Por favor, vuelva a intentar.",
			reminder: "Recuerda que tus datos son privados y no serán compartidos.",
			buttonText: "OK"
		}
	},
	validateIdentity: {
		header: "Validar Identidad",
		welcome: "Te damos la bienvenida",
		step: "Paso",
		stepTotal: "/3",
		what: {
			header: "¿Qué es la validación de identidad?",
			description: `Es un proceso simple mediante el cual vas a poder confirmar que vos sos quien decís ser. De esta forma, vas a poder acceder a todos los servicios de ${appName}.`,
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
		},
		explainSelfie: {
			step: 3,
			header: "Foto Selfie y Prueba de Vida",
			description(gesture: LivenessGesture){
				return gestures(gesture,TypeGestures.description);
			},
			gestureExplanation(gesture: LivenessGesture){
				return gestures(gesture,TypeGestures.gestureExplanation);
			},
			confirmation: "Asegurate de que tu cara sea claramente visible y no esté cubierta.",
			cameraExplanation: "Enfocá tu cara"
		},
		submit: {
			header: "Validación de Identidad",
			congrats: "Se enviarán los siguientes datos a validar por ReNaPer:",
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
			retryButton: "Reintentar",
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
		DNI: {
			description: "DNI",
			placeholder: "DNI sin puntos ni espacios"
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
			placeholder: "Ingresá el código de área + número"
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
			id: "ID Emisor",
			unknown: "Emisor desconocido",
			known: (name: string) => `Emisor: ${name}`,
			loading: "Cargando..."
		},
		valueNotAvailable: "N/A",
		verificationBlockchain: "Blockchain de Verificación",
		shared: "Credencial compartida con vos",
		revoked: "Credencial revocada",
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

			const dateRegex = /\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d\.\d+([+-][0-2]\d:[0-5]\d|Z)/;
			if (typeof value === "string" && value.match(dateRegex)) {
				const date = new Date(value);
				return formatDate(date);
			} else {
				return map[value] ?? `${value}`;
			}
		}
	},
	specialCredentials: {
		PhoneNumberData: {
			title: "Número de celular",
			phoneNumber: "",
			key: "PhoneNumberData"
		},
		EmailData: {
			title: "Email",
			email: "",
			key: "EmailData"
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
		},
		Semillas: {
			title: "semillas",
			keys: {
				cert: "CREDENCIAL",
				relationship: "Relacion con Titular",
				name: "NOMBRE",
				lastName: "APELLIDO",
				nameBeneficiario: "Nombre Beneficiario",
				dniBeneficiario: "Dni Beneficiario",
				dniTitular: "Dni Titular",
				birthDate: "Fecha de Nacimiento",
				genre: "Genero"
			}
		}
	},
	camera: {
		notAuthorized: "Cámara no autorizada",
		scanQRInstruction: "Escaneá un código QR",
		processing: "Procesando...",
		noCredentials: {
			title: "No hay credenciales",
			message: "El código QR escaneado no contiene credenciales"
		},
		wrongShare: {
			title: "¡Falta un paso!",
			message:
				"Para poder leer este código QR correctamente necesitás escanear un QR anterior.\n" +
				"Pedile a la persona que te está compartiendo sus credenciales que te lo muestre para poder escanearlo y seguir con el proceso."
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
	general: {
		cancel: "Cancelar",
		share: "Compartir",
		next: "Siguiente",
		nameAndLastname: "Nombre y Apellido",
		declaredDNI: "DNI declarado",
		email: "eMail",
		phone: "Celular",
		filterBy: {
			category: "Categoría:"
		}
	},
	jwtParseError: (error: JWTParseError) => {
		switch (error.type) {
			case "AFTER_EXP":
				{
					const displayTimestamp = (ts: number) => formatFullDate(new Date(ts * 1000));
					return {
						errorCode: `TOKEN_AFTER_EXP`,
						title: "Credencial Vencida",
						message: `Hora actual: ${displayTimestamp(error.current)}\n\nVencimiento: ${displayTimestamp(error.expected)}`
					};
				}
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
