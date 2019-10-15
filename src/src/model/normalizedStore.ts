import { createStore, combineReducers, Store, Reducer, AnyAction } from "redux";
import { persistStore, persistReducer } from "redux-persist";
import FSStorage from "redux-persist-fs-storage";

import { tokenReducer, TokenAction } from "./reducers/tokenReducer";

export type NormalizedStoreAction = TokenAction;

export type NormalizedStoreContent = {
	tokens: string[];
};

const reducer: Reducer<NormalizedStoreContent, NormalizedStoreAction> = combineReducers({
	tokens: tokenReducer
});

const persistedReducer = persistReducer(
	{
		key: "root",
		keyPrefix: "",
		storage: FSStorage()
	},
	reducer
);

export const store = createStore(persistedReducer) as Store<any, AnyAction>;

export const persistor = persistStore(store);
