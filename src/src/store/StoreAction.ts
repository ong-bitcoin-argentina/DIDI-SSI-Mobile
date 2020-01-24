import { ServiceCallAction } from "../services/ServiceStateStore";

import { DidAction } from "./reducers/didReducer";
import { IdentityAction } from "./reducers/identityReducer";
import { IssuerAction } from "./reducers/issuerReducer";
import { ServiceSettingAction } from "./reducers/serviceSettingsReducer";
import { SessionAction } from "./reducers/sessionReducer";
import { TokenAction } from "./reducers/tokenReducer";
import { ValidateDniAction } from "./reducers/validateDniProgressReducer";

export type StoreAction =
	| TokenAction
	| ServiceSettingAction
	| SessionAction
	| ServiceCallAction
	| IdentityAction
	| ValidateDniAction
	| DidAction
	| IssuerAction;
