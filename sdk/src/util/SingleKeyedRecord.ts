import { either } from "fp-ts/lib/Either";
import * as t from "io-ts";

import TypedObject from "./TypedObject";

export function SingleKeyedRecordCodec<A, O>(codec: t.Type<A, O>) {
	const outerCodec = t.record(t.string, codec);
	const innerCodec = t.type({
		key: t.string,
		value: codec
	});

	type Mid = t.TypeOf<typeof outerCodec>;
	type Inner = t.TypeOf<typeof innerCodec>;

	return outerCodec.pipe(
		new t.Type<Inner, Mid, Mid>(
			`SingleKeyedRecordCodec_${codec.name}`,
			innerCodec.is,
			(i, c) => {
				const keys = TypedObject.keys(i);
				if (keys.length !== 1) {
					return t.failure(i, c);
				}
				const key = keys[0];
				return either.chain(codec.decode(i[key]), value => t.success({ key, value }));
			},
			a => ({
				[a.key]: a.value
			})
		)
	);
}
