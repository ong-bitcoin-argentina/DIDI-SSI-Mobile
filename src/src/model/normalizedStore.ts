import { createStore, combineReducers, Store, Reducer, AnyAction } from "redux";
import { persistStore, persistReducer, StateReconciler } from "redux-persist";
import FSStorage from "redux-persist-fs-storage";

import { tokenReducer, TokenAction } from "./reducers/tokenReducer";
import { ServiceSettingAction, serviceSettingsReducer } from "./reducers/serviceSettingsReducer";
import { ServiceSettings } from "./data/ServiceSettings";
import autoMergeLevel1 from "redux-persist/es/stateReconciler/autoMergeLevel1";
import autoMergeLevel2 from "redux-persist/es/stateReconciler/autoMergeLevel2";

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
