export default class TypedObject {
	static keys<T>(o: T): Array<keyof T> {
		return Object.keys(o) as Array<keyof T>;
	}

	static values<T>(o: { [key: string]: T }): T[] {
		return o ? Object.values(o) : [];
	}

	static mapValues<V, R>(o: { [key: string]: V }, fn: (value: V) => R): { [key: string]: R } {
		const result: { [key: string]: R } = {};
		TypedObject.keys(o).forEach(key => {
			result[key] = fn(o[key]);
		});
		return result;
	}
}
