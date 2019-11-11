import * as t from "io-ts";

export const errorDataCodec = t.type(
	{
		errorCode: t.string,
		message: t.string
	},
	"errorDataCodec"
);
export type ErrorData = typeof errorDataCodec._A;

function error(errorCode: string, message: string): { errorCode: string; message: string } {
	return { errorCode, message };
}

export const serviceErrors = {
	common: {
		FETCH_ERR: error("FETCH_ERR", "Error al enviar peticion al servidor."),
		JSON_ERR: error("JSON_ERR", "Error al interpretar formato de respuesta."),
		PARSE_ERR: error("PARSE_ERR", "Error al interpretar formato de respuesta.")
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
		FETCH_ERR: error("FETCH_TG_ERR", "Error al enviar peticion al servidor.")
	}
};
