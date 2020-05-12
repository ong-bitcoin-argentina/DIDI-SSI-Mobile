import { Identity } from "didi-sdk";
import { AnyAction, combineReducers, createStore, Store } from "redux";
import { combineReducers as combineLoopReducers, install as installReduxLoop, liftState, Loop } from "redux-loop";
import { persistReducer, persistStore, StateReconciler } from "redux-persist";
import FSStorage from "redux-persist-fs-storage";
import { PersistPartial } from "redux-persist/es/persistReducer";
import autoMergeLevel2 from "redux-persist/es/stateReconciler/autoMergeLevel2";

import { assertUnreachable } from "../util/assertUnreachable";
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

const persistedStoreContentReducer = combineReducers<PersistedStoreContent, StoreAction>({
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

function deletionReducer(state: PersistedStoreContent | undefined, action: StoreAction): PersistedStoreContent {
	if (state === undefined || action.type !== "RESET_PERSISTED_STORE") {
		return persistedStoreContentReducer(state, action);
	}

	const nextState = persistedStoreContentReducer(undefined, action);
	TypedObject.keys(deletionPolicy).forEach(key => {
		if (deletionPolicy[key] === "device") {
			nextState[key] = state[key] as any;
		}
	});
	return nextState;
}

const stateReconciler: StateReconciler<PersistedStoreContent> = autoMergeLevel2;

const persistedReducer = persistReducer(
	{
		key: "root",
		keyPrefix: "",
		storage: FSStorage(),
		stateReconciler
	},
	deletionReducer
);

export interface NormalizedStoreContent {
	persisted: PersistedStoreContent & PersistPartial;
	serviceCalls: ServiceCallState;
}

const storeReducer = combineLoopReducers({
	persisted: persistedReducer,
	serviceCalls: serviceCallReducer
});

export const store = createStore(
	storeReducer as any,
	installReduxLoop({
		DONT_LOG_ERRORS_ON_HANDLED_FAILURES: true
	})
) as Store<any, AnyAction>;

export const persistor = persistStore(store);
