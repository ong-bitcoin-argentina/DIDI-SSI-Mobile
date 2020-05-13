import { ErrorData } from "didi-sdk";

function error(errorCode: string, message: string): ErrorData {
	return { errorCode, message };
}

export const serviceErrors = {
	common: {
		UNKNOWN_ERR: error("UNKNOWN_ERR", "Error desconocido."),
		FETCH_ERR: error("FETCH_ERR", "Error al enviar peticion al servidor."),
		JSON_ERR: error("JSON_ERR", "Error al interpretar formato de respuesta."),
		PARSE_ERR: error("PARSE_ERR", "Error al interpretar formato de respuesta."),
		CRYPTO_ERR: error("CRYPTO_ERR", "Error durante el proceso de encripción."),
		DECODE_ERR: (message: string) => error("DECODE_ERR", message)
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
		DELETE_ERROR: error("SIGNER_DELETE_ERR", "Error al eliminar DID actual."),
		PARSE_MNEMONIC: error("SIGNER_PARSE_MNEMONIC", "Error al regenerar clave privada"),
		PARSE_ADDRESS: (address: string) =>
			error("DID_PARSE_ADDR_ERR", `DID address '${address}' no cumple el formato esperado`),
		PARSE_DID: (did: string) => error("DID_PARSE_ERR", `DID '${did}' no cumple el formato esperado`)
	},
	disclosure: {
		SIGNING_ERR: error("SIGNING_ERR", "Error al firmar respuesta a la peticion.")
	},
	trustGraph: {
		FETCH_ERR: error("FETCH_TG_ERR", "Error al recuperar credenciales del servidor.")
	}
};
