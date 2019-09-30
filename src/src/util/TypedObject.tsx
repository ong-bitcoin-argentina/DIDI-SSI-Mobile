export default class TypedObject {
	static keys<T>(o: T): Array<keyof T> {
		return Object.keys(o) as Array<keyof T>;
	}

	static values<T>(o: { [key: string]: T }): T[] {
		return o ? Object.values(o) : [];
	}
}
