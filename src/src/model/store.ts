import { createStore, combineReducers, Store, Reducer } from "redux";
import { documentReducer, DocumentAction } from "./reducers/documentReducer";
import { identityReducer, IdentityAction } from "./reducers/identityReducer";
import { recentActivityReducer, RecentActivityAction } from "./reducers/recentActivityReducer";

import { Document } from "./data/Document";
import { Identity } from "./data/Identity";
import { RecentActivity } from "./data/RecentActivity";

export type StoreContent = {
	documents: Document[];
	identity: Identity;
	recentActivity: RecentActivity[];
};

export type StoreAction = DocumentAction | IdentityAction | RecentActivityAction;

const reducer: Reducer<StoreContent, StoreAction> = combineReducers({
	documents: documentReducer,
	identity: identityReducer,
	recentActivity: recentActivityReducer
});

const store: Store<StoreContent, StoreAction> = createStore(reducer);

export default store;
