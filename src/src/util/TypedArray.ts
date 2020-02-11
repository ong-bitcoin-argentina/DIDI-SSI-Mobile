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
	},

	every<T, U extends T>(array: T[], pred: (val: T) => val is U): array is U[] {
		return array.every(pred);
	},

	uniqueElements<T>(array: T[], match: (left: T, right: T) => boolean): T[] {
		const result: T[] = [];
		for (const value of array) {
			if (!result.find(existing => match(existing, value))) {
				result.push(value);
			}
		}
		return result;
	}
};
export default TypedArray;
