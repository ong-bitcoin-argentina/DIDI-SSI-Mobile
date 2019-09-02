export default class TypedObject {
        static values<T>(o: {[key: string]: T}): T[] {
                return o ? Object.values(o) : []
        }
}