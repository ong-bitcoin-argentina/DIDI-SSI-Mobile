import { ServiceAction, serviceReducer, ServiceStateOf } from "../common/ServiceState";

export interface SubmitDisclosureResponseArguments {
	callback: string;
	accessToken: string;
}

async function submitDisclosureResponse(args: SubmitDisclosureResponseArguments): Promise<boolean> {
	const response = await fetch(args.callback, {
		method: "POST",
		headers: {
			"Content-Type": "application/json"
		},
		body: JSON.stringify({ access_token: args.accessToken })
	});

	const body = await response.json();
	return typeof body === "object" && body.status === "success";
}

export type SubmitDisclosureResponseAction = ServiceAction<
	"SERVICE_DISCLOSURE_RESPONSE",
	SubmitDisclosureResponseArguments,
	boolean,
	string
>;

export type SubmitDisclosureResponseState = ServiceStateOf<SubmitDisclosureResponseAction>;

export const submitDisclosureResponseReducer = serviceReducer(
	"SERVICE_DISCLOSURE_RESPONSE",
	submitDisclosureResponse,
	(act): act is SubmitDisclosureResponseAction => act.type === "SERVICE_DISCLOSURE_RESPONSE"
);
