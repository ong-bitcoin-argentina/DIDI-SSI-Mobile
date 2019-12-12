import { ErrorData } from "../services/common/ErrorData";

import { serviceErrors } from "../presentation/resources/serviceErrors";

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

export class JWTParseError extends Error {
	private content: JWTParseErrorContent;

	constructor(content: JWTParseErrorContent) {
		const errorData = JWTParseError.getErrorData(content);
		super(`${errorData.errorCode} ${errorData.title ? errorData.title : ""} ${errorData.message}`);
		this.content = content;
	}

	getErrorData(): ErrorData {
		return JWTParseError.getErrorData(this.content);
	}

	private static getErrorData(error: JWTParseErrorContent): ErrorData {
		const displayError = (e: unknown) => (e instanceof Error ? e.message : JSON.stringify(e, null, 4));

		switch (error.type) {
			case "AFTER_EXP":
				return serviceErrors.jwtParse.AFTER_EXP(error.current, error.expected);
			case "BEFORE_IAT":
				return serviceErrors.jwtParse.BEFORE_IAT;
			case "RESOLVER_CREATION_ERROR":
				return serviceErrors.jwtParse.RESOLVER_CREATION_ERROR;
			case "JWT_DECODE_ERROR":
				console.warn(displayError(error.error));
				return serviceErrors.jwtParse.JWT_DECODE_ERROR;
			case "SHAPE_DECODE_ERROR":
				return serviceErrors.jwtParse.SHAPE_DECODE_ERROR(error.errorMessage);
			case "NONCREDENTIAL_WRAP_ERROR":
				return serviceErrors.jwtParse.NONCREDENTIAL_WRAP_ERROR;
			case "VERIFICATION_ERROR":
				console.warn(displayError(error.error));
				return serviceErrors.jwtParse.VERIFICATION_ERROR;
		}
	}
}
