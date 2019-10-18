import { AnyAction, combineReducers, createStore, Reducer, Store } from "redux";
import { persistReducer, persistStore, StateReconciler } from "redux-persist";
import FSStorage from "redux-persist-fs-storage";
import autoMergeLevel1 from "redux-persist/es/stateReconciler/autoMergeLevel1";
import autoMergeLevel2 from "redux-persist/es/stateReconciler/autoMergeLevel2";

import { ServiceSettings } from "../model/ServiceSettings";

import { ServiceSettingAction, serviceSettingsReducer } from "./reducers/serviceSettingsReducer";
import { TokenAction, tokenReducer } from "./reducers/tokenReducer";

export type NormalizedStoreAction = TokenAction | ServiceSettingAction;

export type NormalizedStoreContent = {
	tokens: string[];
	serviceSettings: ServiceSettings;
};

const reducer: Reducer<NormalizedStoreContent, NormalizedStoreAction> = combineReducers({
	tokens: tokenReducer,
	serviceSettings: serviceSettingsReducer
});

const stateReconciler: StateReconciler<NormalizedStoreContent> = autoMergeLevel2;

const persistedReducer = persistReducer(
	{
		key: "root",
		keyPrefix: "",
		storage: FSStorage(),
		stateReconciler
	},
	reducer
);

export const store = createStore(persistedReducer) as Store<any, AnyAction>;

export const persistor = persistStore(store);
