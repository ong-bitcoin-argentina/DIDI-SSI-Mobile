import { RecentActivity } from "../../model/RecentActivity";
import { StoreAction } from "../StoreAction";

interface RecentActivityActionAdd {
	type: "RECENT_ACTIVITY_ADD";
	value: RecentActivity;
}
export type RecentActivityAction = RecentActivityActionAdd;

export function recentActivityReducer(state: RecentActivity[] | undefined, action: StoreAction): RecentActivity[] {
	if (state === undefined) {
		return [];
	}

	switch (action.type) {
		case "RECENT_ACTIVITY_ADD":
			return [action.value, ...state];

		default:
			return state;
	}
}
