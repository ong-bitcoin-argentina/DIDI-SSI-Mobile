import { createStore, combineReducers, Store, Reducer, AnyAction } from "redux";
import { persistStore, persistReducer } from "redux-persist";
import FSStorage from "redux-persist-fs-storage";

import { documentReducer, DocumentAction } from "./reducers/documentReducer";
import { identityReducer, IdentityAction } from "./reducers/identityReducer";
import { recentActivityReducer, RecentActivityAction } from "./reducers/recentActivityReducer";
import { sampleDocumentReducer } from "./reducers/sampleDocumentReducer";

import { SampleDocument } from "./data/SampleDocument";
import { UPortDocument } from "./data/UPortDocument";
import { Identity } from "./data/Identity";
import { RecentActivity } from "./data/RecentActivity";

export type StoreContent = {
	samples: SampleDocument[];
	documents: UPortDocument[];
	identity: Identity;
	recentActivity: RecentActivity[];
};

export type StoreAction = DocumentAction | IdentityAction | RecentActivityAction;

const reducer: Reducer<StoreContent, StoreAction> = combineReducers({
	samples: sampleDocumentReducer,
	documents: documentReducer,
	identity: identityReducer,
	recentActivity: recentActivityReducer
});

const persistedReducer = persistReducer(
	{
		key: "root",
		keyPrefix: "",
		storage: FSStorage(),
		blacklist: ["samples", "identity", "recentActivity"]
	},
	reducer
);

export const store = createStore(persistedReducer) as Store<any, AnyAction>;

export const persistor = persistStore(store);
