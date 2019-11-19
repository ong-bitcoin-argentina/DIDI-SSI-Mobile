export default class Validator {
	static isValidationCode(code?: string): boolean {
		if (code) {
			const match = code.match("^[0-9]{6}$");
			if (match) {
				return match.length > 0;
			}
		}
		return false;
	}

	static isName(code?: string): boolean {
		return Validator.isString(code);
	}

	static isPassword(code?: string): boolean {
		return Validator.isString(code);
	}

	static isDocumentNumber(code?: string): boolean {
		return Validator.isNumber(code);
	}

	static isPhoneNumber(code?: string): boolean {
		return Validator.isNumber(code);
	}

	static isNationality(code?: string): boolean {
		return Validator.isString(code);
	}

	static isEmail(code?: string): boolean {
		if (code) {
			const match = code.match(
				"^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$"
			);
			if (match) {
				return match.length > 0;
			}
		}
		return false;
	}

	private static isString(code?: string): boolean {
		if (code) {
			return code.length > 0;
		}
		return false;
	}

	private static isNumber(code?: string): boolean {
		if (code) {
			const match = code.match("^[0-9]*$");
			if (match) {
				return match.length > 0;
			}
		}
		return false;
	}
}
