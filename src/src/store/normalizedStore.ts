import { Identity } from "didi-sdk";
import { AnyAction, combineReducers, createStore, Store } from "redux";
import { install as installReduxLoop, liftState, Loop } from "redux-loop";
import { persistReducer, persistStore, StateReconciler } from "redux-persist";
import FSStorage from "redux-persist-fs-storage";
import { PersistPartial } from "redux-persist/es/persistReducer";
import autoMergeLevel2 from "redux-persist/es/stateReconciler/autoMergeLevel2";

import { liftUndefined } from "../util/liftUndefined";

import { DidiSession } from "../model/DidiSession";
import { RecentActivity } from "../model/RecentActivity";
import { ServiceSettings } from "../model/ServiceSettings";
import { serviceCallReducer, ServiceCallState } from "../services/ServiceStateStore";

import { ActiveDid, didReducer } from "./reducers/didReducer";
import { identityReducer } from "./reducers/identityReducer";
import { issuerReducer, IssuerRegistry } from "./reducers/issuerReducer";
import { recentActivityReducer } from "./reducers/recentActivityReducer";
import { serviceSettingsReducer } from "./reducers/serviceSettingsReducer";
import { sessionReducer } from "./reducers/sessionReducer";
import { tokenReducer } from "./reducers/tokenReducer";
import { validateDniReducer, ValidateDniState } from "./reducers/validateDniProgressReducer";
import { StoreAction } from "./StoreAction";

export interface PersistedStoreContent {
	did: ActiveDid;
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

const storeReducer = (
	state: NormalizedStoreContent | undefined,
	action: StoreAction
): Loop<NormalizedStoreContent, StoreAction> => {
	const persisted = persistedReducer(
		liftUndefined(action.type === "RESET_PERSISTED_STORE" ? undefined : state, s => s.persisted),
		action
	);

	const [serviceCalls, actions] = serviceCallReducer(
		liftUndefined(state, s => s.serviceCalls),
		action
	);

	return [{ persisted, serviceCalls }, actions];
};

export const store = createStore(
	storeReducer as any,
	installReduxLoop({
		DONT_LOG_ERRORS_ON_HANDLED_FAILURES: true
	})
) as Store<any, AnyAction>;

export const persistor = persistStore(store);
