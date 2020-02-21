const TypedObject = {
	keys<T>(o: T): Array<keyof T> {
		return Object.keys(o) as Array<keyof T>;
	},

	values<T>(o: { [key: string]: T }): T[] {
		return o ? Object.values(o) : [];
	},

	mapValues<V, R>(o: { [key: string]: V }, fn: (value: V, key: string) => R): { [key: string]: R } {
		const result: { [key: string]: R } = {};
		TypedObject.keys(o).forEach(key => {
			result[key] = fn(o[key], key as string);
		});
		return result;
	},

	everyValue<V, Q extends V>(o: { [key: string]: V }, fn: (value: V) => value is Q): o is { [key: string]: Q } {
		return Object.values(o).every(fn);
	}
};
export default TypedObject;
