function matchesRegex(regex: string | RegExp): (code?: string) => boolean {
	return code => {
		if (code === undefined) {
			return false;
		}
		const match = code.match(regex);
		if (match) {
			return match.length > 0;
		} else {
			return false;
		}
	};
}

function hasMinLength(length: number): (code?: string) => boolean {
	return code => {
		if (code) {
			return code.length >= length;
		} else {
			return false;
		}
	};
}

const isNumber = matchesRegex("^[0-9]*$");

export const Validations = {
	isValidationCode: matchesRegex("^[0-9]{6}$"),

	isName: hasMinLength(1),

	isPassword(code?: string): boolean {
		const checks = [
			hasMinLength(8),
			matchesRegex("[A-Z]"),
			matchesRegex("[a-z]"),
			matchesRegex("[0-9]"),
			matchesRegex("[^A-Za-z0-9]")
		];
		return checks.every(ch => ch(code));
	},

	isDocumentNumber: isNumber,

	isPhoneNumber: isNumber,

	isNationality: hasMinLength(1),

	isEmail: matchesRegex(
		"^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$"
	)
};
