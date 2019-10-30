import { AnyAction, combineReducers, createStore, Store } from "redux";
import { install as installReduxLoop, Loop } from "redux-loop";
import { persistReducer, persistStore, StateReconciler } from "redux-persist";
import FSStorage from "redux-persist-fs-storage";
import { PersistPartial } from "redux-persist/es/persistReducer";
import autoMergeLevel2 from "redux-persist/es/stateReconciler/autoMergeLevel2";

import { liftUndefined } from "../util/liftUndefined";

import { ServiceSettings } from "../model/ServiceSettings";
import { serviceCallReducer, ServiceCallState } from "../services/ServiceStateStore";

import { serviceSettingsReducer } from "./reducers/serviceSettingsReducer";
import { tokenReducer } from "./reducers/tokenReducer";
import { StoreAction } from "./StoreAction";

export interface PersistedStoreContent {
	tokens: string[];
	serviceSettings: ServiceSettings;
}

const reducer = combineReducers<PersistedStoreContent, StoreAction>({
	tokens: tokenReducer,
	serviceSettings: serviceSettingsReducer
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
	const persisted = persistedReducer(liftUndefined(state, s => s.persisted), action);
	const [serviceCalls, actions] = serviceCallReducer(
		liftUndefined(state, s => s.serviceCalls),
		action,
		persisted.serviceSettings
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
