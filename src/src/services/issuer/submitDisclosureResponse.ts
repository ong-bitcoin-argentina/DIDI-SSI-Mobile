export async function submitDisclosureResponse(callback: string, accessToken: string): Promise<boolean> {
	const response = await fetch(callback, {
		method: "POST",
		headers: {
			"Content-Type": "application/json"
		},
		body: JSON.stringify({ access_token: accessToken })
	});

	const body = await response.json();
	return typeof body === "object" && body.status === "success";
}
