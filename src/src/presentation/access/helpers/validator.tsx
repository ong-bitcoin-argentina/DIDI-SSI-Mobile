export default class Validator {
	static isPhoneNumber(code?: String): boolean {
		if (code) {
			const match = code.match("^[0-9]{6}$");
			if (match) {
				return match.length > 0;
			}
		}
		return false;
	}

	static isEmail(code?: String): boolean {
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
}
