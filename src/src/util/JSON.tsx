import * as t from "io-ts";

export type JSONValue = string | number | boolean | null | JSONObject | JSONArray;

interface JSONObject {
	[property: string]: JSONValue;
}

interface JSONArray extends Array<JSONValue> {}

export const JSONValueCodec = t.recursion<JSONValue>("JSONValueCodec", tJSONCodec =>
	t.union([t.string, t.number, t.boolean, t.null, t.array(tJSONCodec), t.record(t.string, tJSONCodec)])
);
