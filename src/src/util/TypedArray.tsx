const TypedArray = {
	flatMap<T, U>(array: T[], fn: (val: T) => U | undefined | null): U[] {
		const result: U[] = [];
		for (const value of array) {
			const transformed = fn(value);
			if (transformed !== undefined && transformed !== null) {
				result.push(transformed);
			}
		}
		return result;
	}
};
export default TypedArray;
