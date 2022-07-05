import { Identity } from "@proyecto-didi/app-sdk";
import { AnyAction, combineReducers, createStore, Store } from "redux";
import { combineReducers as combineLoopReducers, install as installReduxLoop } from "redux-loop";
import { persistReducer, persistStore, StateReconciler } from "redux-persist";
import FilesystemStorage from "redux-persist-filesystem-storage";
import { PersistPartial } from "redux-persist/es/persistReducer";
import autoMergeLevel2 from "redux-persist/es/stateReconciler/autoMergeLevel2";

import TypedObject from "../util/TypedObject";

import { DidiSession } from "../model/DidiSession";
import { RecentActivity } from "../model/RecentActivity";
import { ServiceSettings } from "../model/ServiceSettings";
import { reloadDid } from "../services/internal/reloadDid";
import { serviceCallReducer, ServiceCallState } from "../services/ServiceStateStore";

import { DidState, didReducer } from "./reducers/didReducer";
import { CodeState, phoneVerificationReducer } from "./reducers/phoneVerificationReducer";
import { identityReducer } from "./reducers/identityReducer";
import { issuerReducer, IssuerRegistry } from "./reducers/issuerReducer";
import { pushNotificationReducer, PushState } from "./reducers/pushNotificationReducer";
import { recentActivityReducer } from "./reducers/recentActivityReducer";
import { seenTokenReducer } from "./reducers/seenTokenReducer";
import { serviceSettingsReducer } from "./reducers/serviceSettingsReducer";
import { sessionReducer } from "./reducers/sessionReducer";
import { tokenReducer } from "./reducers/tokenReducer";
import { tokensInLastSyncReducer } from "./reducers/tokensInLastSyncReducer";
import { validateDniReducer, ValidateDniState } from "./reducers/validateDniProgressReducer";
import { StoreAction } from "./StoreAction";
import { prestadoresReducer, PrestadoresRegistry } from "./reducers/prestadoresReducer";
import { validateSemillasDniReducer, ValidateSemillasDniState } from "./reducers/validateSemillasDniReducer";
import { authAppsReducer, AuthAppsState } from "./reducers/authAppsReducer";
import { persistedPersonalDataReducer, PersistedPersonalData } from "./reducers/persistedPersonalDataReducer";
import { pendingLinkingReducer, PendingLinkingState } from "./reducers/pendingLinkingReducer";
import { IssuersRegistry, persistedIssuersDataReducer } from "./reducers/persistedIssuersDataReducer";
import { VuSecurityData, vuSecurityDataReducer } from './reducers/vuSecurityDataReducer';
import { ValidateCoopsolDniState, validateCoopsolDniReducer } from './reducers/validateCoopsolDniReducer';

export interface PersistedStoreContent {
	did: DidState;
	pushToken: PushState;
	sessionFlags: DidiSession;
	codeConfirmation: CodeState;
	tokens: string[];
	tokensInLastSync: string[] | null;
	seenTokens: string[];
	userInputIdentity: Identity;
	serviceSettings: ServiceSettings;
	validateDni: ValidateDniState;
	validateSemillasDni: ValidateSemillasDniState;
	knownIssuers: IssuerRegistry;
	prestadores: PrestadoresRegistry;
	recentActivity: RecentActivity[];
	authApps: AuthAppsState;
	persistedPersonalData: PersistedPersonalData;
	pendingLinking: PendingLinkingState;
	issuersNames: IssuersRegistry;
	vuSecurityData:VuSecurityData;
	validateCoopsolDni: ValidateCoopsolDniState;
}

const persistedStoreContentReducer = combineReducers<PersistedStoreContent, StoreAction>({
	did: didReducer,
	pushToken: pushNotificationReducer,
	sessionFlags: sessionReducer,
	codeConfirmation: phoneVerificationReducer,
	tokens: tokenReducer,
	tokensInLastSync: tokensInLastSyncReducer,
	seenTokens: seenTokenReducer,
	userInputIdentity: identityReducer,
	serviceSettings: serviceSettingsReducer,
	validateDni: validateDniReducer,
	validateSemillasDni: validateSemillasDniReducer,
	knownIssuers: issuerReducer,
	prestadores: prestadoresReducer,
	recentActivity: recentActivityReducer,
	authApps: authAppsReducer,
	persistedPersonalData: persistedPersonalDataReducer,
	pendingLinking: pendingLinkingReducer,
	issuersNames: persistedIssuersDataReducer,
	vuSecurityData: vuSecurityDataReducer,
	validateCoopsolDni: validateCoopsolDniReducer
});

const deletionPolicy: { [name in keyof PersistedStoreContent]: "device" | "user" } = {
	did: "device",
	pushToken: "device",
	sessionFlags: "user",
	codeConfirmation: "user",
	tokens: "user",
	tokensInLastSync: "user",
	seenTokens: "user",
	userInputIdentity: "user",
	serviceSettings: "device",
	validateDni: "user",
	validateSemillasDni: "user",
	knownIssuers: "user",
	prestadores: "user",
	recentActivity: "user",
	authApps: "user",
	persistedPersonalData: "user",
	pendingLinking: "device",
	issuersNames: "user",
	vuSecurityData:"user",
	validateCoopsolDni: "user"
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
		storage: FilesystemStorage,
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

export const persistor = persistStore(store, {}, () => {
	store.dispatch(reloadDid());
});
