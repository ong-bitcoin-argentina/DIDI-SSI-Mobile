export type JSONValue = string | number | boolean | null | JSONObject | JSONArray;

export interface JSONObject {
	[property: string]: JSONValue;
}

export interface JSONArray extends Array<JSONValue> {}
