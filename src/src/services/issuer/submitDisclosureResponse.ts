import { ServiceAction, serviceReducer, ServiceStateOf } from "../common/ServiceState";

import { RequestDocument } from "../../model/RequestDocument";
import { signDisclosureResponse } from "../../uPort/createDisclosureResponse";
import { Claim } from "../../uPort/types/Claim";

export interface SubmitDisclosureResponseArguments {
	request: RequestDocument;
	own: Claim;
	verified: string[];
}

async function submitDisclosureResponse(args: SubmitDisclosureResponseArguments): Promise<boolean> {
	const accessToken = await signDisclosureResponse(args.request, args.own, args.verified);

	const response = await fetch(args.request.content.callback, {
		method: "POST",
		headers: {
			"Content-Type": "application/json"
		},
		body: JSON.stringify({ access_token: accessToken })
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
