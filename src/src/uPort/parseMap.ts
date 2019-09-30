import TypedObject from "../util/TypedObject";

export function parseStructure<S extends object, T extends S>(
	source: any,
	initial: S,
	transform: { [K in Exclude<keyof T, keyof S>]: string }
): { error: "MISSING_FIELD"; checked: string[] } | { error: null; payload: T } {
	const result: S & Partial<Omit<T, keyof S>> = initial;
	const missingFields: string[] = [];

	TypedObject.keys(transform).forEach(target => {
		const key = transform[target];
		if (source[key]) {
			result[target] = source[key];
		} else {
			missingFields.push(key);
		}
	});

	if (missingFields.length === 0) {
		return { error: null, payload: result as T };
	} else {
		return { error: "MISSING_FIELD", checked: missingFields };
	}
}
