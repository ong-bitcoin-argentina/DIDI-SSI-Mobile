import { ErrorData } from "../../services/common/ErrorData";

function error(errorCode: string, message: string): ErrorData {
	return { errorCode, message };
}

export const serviceErrors = {
	common: {
		UNKNOWN_ERR: error("UNKNOWN_ERR", "Error desconocido."),
		FETCH_ERR: error("FETCH_ERR", "Error al enviar peticion al servidor."),
		JSON_ERR: error("JSON_ERR", "Error al interpretar formato de respuesta."),
		PARSE_ERR: error("PARSE_ERR", "Error al interpretar formato de respuesta.")
	},
	login: {
		NO_DID: error(
			"LOGIN_NO_USER_DID",
			"No hay usuarios almacenados en este teléfono, es necesario recuperar la cuenta para loguearse."
		)
	},
	did: {
		READ_ERROR: error("SIGNER_READ_ERR", "Error al obtener DID almacenado."),
		WRITE_ERROR: error("SIGNER_WRITE_ERR", "Error al almacenar nuevo DID."),
		PARSE_ADDRESS: (address: string) =>
			error("DID_PARSE_ADDR_ERR", `DID address '${address}' no cumple el formato esperado`),
		PARSE_DID: (did: string) => error("DID_PARSE_ERR", `DID '${did}' no cumple el formato esperado`)
	},
	disclosure: {
		SIGNING_ERR: error("SIGNING_ERR", "Error al firmar respuesta a la peticion."),
		ISSUER_ERR: (text: string) => error("ISSUER_ERR", text)
	},
	trustGraph: {
		FETCH_ERR: error("FETCH_TG_ERR", "Error al recuperar credenciales del servidor.")
	}
};

export const jwtParseErrors = {
	AFTER_EXP: (currentTimestamp: number, expirationTimestamp: number) => {
		const displayTimestamp = (ts: number) => new Date(ts * 1000).toLocaleString();
		return {
			errorCode: `TOKEN_AFTER_EXP`,
			title: "Credencial Vencida",
			message: `Hora actual: ${displayTimestamp(currentTimestamp)}, Vencimiento: ${displayTimestamp(
				expirationTimestamp
			)}`
		};
	},
	BEFORE_IAT: {
		errorCode: `TOKEN_BEFORE_IAT`,
		title: "Error de Horario",
		message: "Esta credencial indica que fue emitida en el futuro. Verifique la hora de su dispositivo."
	},
	JWT_DECODE_ERROR: {
		errorCode: "TOKEN_JWT_DECODE_ERROR",
		title: "Error al Decodificar",
		message: "Error al extraer credenciales."
	},
	NONCREDENTIAL_WRAP_ERROR: {
		errorCode: "NONCREDENTIAL_WRAP_ERROR",
		title: "Error al Verificar Credencial",
		message: "Esta credencial contiene una sub-credencial en formato desconocido."
	},
	VERIFICATION_ERROR: {
		errorCode: "TOKEN_VERIFICATION_ERROR",
		title: "Error al Verificar Credencial",
		message: "Verifique tener acceso a internet."
	},
	SHAPE_DECODE_ERROR: (message: string) => ({
		errorCode: "TOKEN_SHAPE_DECODE_ERROR",
		title: "Error al Interpretar Credencial",
		message
	}),
	RESOLVER_CREATION_ERROR: {
		errorCode: "TOKEN_RESOLVER_CREATION_ERROR",
		title: "Error de Conexión",
		message: "Verifique tener acceso a internet."
	}
};
