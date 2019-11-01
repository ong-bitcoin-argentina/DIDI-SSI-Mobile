export function liftUndefined<T, U>(value: T | undefined, fn: (value: T) => U): U | undefined {
	if (value === undefined) {
		return undefined;
	} else {
		return fn(value);
	}
}

export function liftUndefined2<T, U, V>(
	left: T | undefined,
	right: U | undefined,
	fn: (left: T, right: U) => V
): V | undefined {
	if (left === undefined || right === undefined) {
		return undefined;
	} else {
		return fn(left, right);
	}
}
