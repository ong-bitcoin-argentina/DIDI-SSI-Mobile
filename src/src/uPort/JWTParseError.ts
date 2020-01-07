import { jwtParseErrors } from "../presentation/resources/serviceErrors";

type JWTParseErrorContent =
	| {
			type: "AFTER_EXP" | "BEFORE_IAT";
			expected: number;
			current: number;
	  }
	| {
			type: "JWT_DECODE_ERROR" | "VERIFICATION_ERROR";
			error: any;
	  }
	| {
			type: "SHAPE_DECODE_ERROR";
			errorMessage: string;
	  }
	| {
			type: "NONCREDENTIAL_WRAP_ERROR";
	  }
	| {
			type: "RESOLVER_CREATION_ERROR";
	  };

interface JWTErrorData {
	title: string;
	message: string;
	errorCode: string;
}

export class JWTParseError extends Error {
	private content: JWTParseErrorContent;

	constructor(content: JWTParseErrorContent) {
		const errorData = JWTParseError.getErrorData(content);
		super(`${errorData.errorCode} ${errorData.title ? errorData.title : ""} ${errorData.message}`);
		this.content = content;
	}

	getErrorData(): JWTErrorData {
		return JWTParseError.getErrorData(this.content);
	}

	private static getErrorData(error: JWTParseErrorContent): JWTErrorData {
		const displayError = (e: unknown) => (e instanceof Error ? e.message : JSON.stringify(e, null, 4));

		switch (error.type) {
			case "AFTER_EXP":
				return jwtParseErrors.AFTER_EXP(error.current, error.expected);
			case "BEFORE_IAT":
				return jwtParseErrors.BEFORE_IAT;
			case "RESOLVER_CREATION_ERROR":
				return jwtParseErrors.RESOLVER_CREATION_ERROR;
			case "JWT_DECODE_ERROR":
				console.warn(displayError(error.error));
				return jwtParseErrors.JWT_DECODE_ERROR;
			case "SHAPE_DECODE_ERROR":
				return jwtParseErrors.SHAPE_DECODE_ERROR(error.errorMessage);
			case "NONCREDENTIAL_WRAP_ERROR":
				return jwtParseErrors.NONCREDENTIAL_WRAP_ERROR;
			case "VERIFICATION_ERROR":
				console.warn(displayError(error.error));
				return jwtParseErrors.VERIFICATION_ERROR;
		}
	}
}
