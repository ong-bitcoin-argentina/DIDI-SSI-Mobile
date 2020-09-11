import { ServiceCallAction } from "../services/ServiceStateStore";

import { DidAction } from "./reducers/didReducer";
import { IdentityAction } from "./reducers/identityReducer";
import { IssuerAction } from "./reducers/issuerReducer";
import { PushNotificationAction } from "./reducers/pushNotificationReducer";
import { RecentActivityAction } from "./reducers/recentActivityReducer";
import { SeenTokenAction } from "./reducers/seenTokenReducer";
import { ServiceSettingAction } from "./reducers/serviceSettingsReducer";
import { SessionAction } from "./reducers/sessionReducer";
import { TokenAction } from "./reducers/tokenReducer";
import { ValidateDniAction } from "./reducers/validateDniProgressReducer";
import { PrestadoresAction } from "./reducers/prestadoresReducer";
import { ValidateSemillasDniAction } from "./reducers/validateSemillasDniReducer";
import { CodeAction } from "./reducers/phoneVerificationReducer";

export type StoreAction =
	| { type: "RESET_PERSISTED_STORE" }
	| TokenAction
	| SeenTokenAction
	| ServiceSettingAction
	| SessionAction
	| ServiceCallAction
	| IdentityAction
	| ValidateDniAction
	| ValidateSemillasDniAction
	| DidAction
	| IssuerAction
	| RecentActivityAction
	| PrestadoresAction
	| PushNotificationAction
	| CodeAction;
