import { JSONObject } from "didi-sdk/src/util/JSON";

export function serviceRequest<T>(url: string, params: JSONObject, headers: JSONObject = {}): Promise<T> {
	return new Promise((resolve, reject) => {
		fetch(url, {
			method: "POST",
			headers: {
				"Content-Type": "application/json; charset=utf-8",
				...headers
			},
			body: JSON.stringify(params)
		})
			.then(res => {
				resolve(res.json());
			})
			.catch(err => {
				reject(err);
			});
	});
}
