import { Identity } from "didi-sdk";
import { AnyAction, combineReducers, createStore, Store } from "redux";
import { install as installReduxLoop, liftState, Loop } from "redux-loop";
import { persistReducer, persistStore, StateReconciler } from "redux-persist";
import FSStorage from "redux-persist-fs-storage";
import { PersistPartial } from "redux-persist/es/persistReducer";
import autoMergeLevel2 from "redux-persist/es/stateReconciler/autoMergeLevel2";

import TypedObject from "../util/TypedObject";

import { DidiSession } from "../model/DidiSession";
import { RecentActivity } from "../model/RecentActivity";
import { ServiceSettings } from "../model/ServiceSettings";
import { serviceCallReducer, ServiceCallState } from "../services/ServiceStateStore";

import { ActiveDid, didReducer } from "./reducers/didReducer";
import { identityReducer } from "./reducers/identityReducer";
import { issuerReducer, IssuerRegistry } from "./reducers/issuerReducer";
import { pushNotificationReducer, PushState } from "./reducers/pushNotificationReducer";
import { recentActivityReducer } from "./reducers/recentActivityReducer";
import { serviceSettingsReducer } from "./reducers/serviceSettingsReducer";
import { sessionReducer } from "./reducers/sessionReducer";
import { tokenReducer } from "./reducers/tokenReducer";
import { validateDniReducer, ValidateDniState } from "./reducers/validateDniProgressReducer";
import { StoreAction } from "./StoreAction";

export interface PersistedStoreContent {
	did: ActiveDid;
	pushToken: PushState;
	sessionFlags: DidiSession;
	tokens: string[];
	userInputIdentity: Identity;
	serviceSettings: ServiceSettings;
	validateDni: ValidateDniState;
	knownIssuers: IssuerRegistry;
	recentActivity: RecentActivity[];
}

const reducer = combineReducers<PersistedStoreContent, StoreAction>({
	did: didReducer,
	pushToken: pushNotificationReducer,
	sessionFlags: sessionReducer,
	tokens: tokenReducer,
	userInputIdentity: identityReducer,
	serviceSettings: serviceSettingsReducer,
	validateDni: validateDniReducer,
	knownIssuers: issuerReducer,
	recentActivity: recentActivityReducer
});

const stateReconciler: StateReconciler<PersistedStoreContent> = autoMergeLevel2;

const persistedReducer = persistReducer(
	{
		key: "root",
		keyPrefix: "",
		storage: FSStorage(),
		stateReconciler
	},
	reducer
);

export interface NormalizedStoreContent {
	persisted: PersistedStoreContent & PersistPartial;
	serviceCalls: ServiceCallState;
}

const deletionPolicy: { [name in keyof PersistedStoreContent]: "device" | "user" } = {
	did: "user",
	pushToken: "device",
	sessionFlags: "user",
	tokens: "user",
	userInputIdentity: "user",
	serviceSettings: "device",
	validateDni: "user",
	knownIssuers: "user",
	recentActivity: "user"
};

const storeReducer = (
	state: NormalizedStoreContent | undefined,
	action: StoreAction
): Loop<NormalizedStoreContent, StoreAction> => {
	const persisted = persistedReducer(action.type === "RESET_PERSISTED_STORE" ? undefined : state?.persisted, action);

	if (state !== undefined && action.type === "RESET_PERSISTED_STORE") {
		TypedObject.keys(deletionPolicy).forEach(key => {
			persisted[key] = state.persisted[key] as any;
		});
	}

	const [serviceCalls, actions] = serviceCallReducer(state?.serviceCalls, action);

	return [{ persisted, serviceCalls }, actions];
};

export const store = createStore(
	storeReducer as any,
	installReduxLoop({
		DONT_LOG_ERRORS_ON_HANDLED_FAILURES: true
	})
) as Store<any, AnyAction>;

export const persistor = persistStore(store);
