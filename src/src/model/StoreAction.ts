import { Action } from "redux";

interface DoNothing extends Action<string> {
	type: "DoNothing";
}

interface DoMoreNothing extends Action<string> {
	type: "DoMoreNothing";
}

type StoreAction = DoNothing | DoMoreNothing;

export default StoreAction;
