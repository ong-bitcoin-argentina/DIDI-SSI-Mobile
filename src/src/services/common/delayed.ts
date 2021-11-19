import { ErrorData } from "@proyecto-didi/app-sdk";
import { Either, right } from "fp-ts/lib/Either";

import { buildComponentServiceCall } from "./componentServiceCall";

async function doDelay(args: {
	minutes?: number;
	seconds?: number;
	milliseconds?: number;
}): Promise<Either<ErrorData, {}>> {
	const minutes = args.minutes ?? 0;
	const seconds = minutes * 60 + (args.seconds ?? 0);
	const milliseconds = seconds * 1000 + (args.milliseconds ?? 0);

	return new Promise((resolve) => {
		setTimeout(() => resolve(right({})), milliseconds);
	});
}

export const delayed = buildComponentServiceCall(doDelay);
