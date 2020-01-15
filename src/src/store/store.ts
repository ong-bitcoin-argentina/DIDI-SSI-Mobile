import { ComponentType } from "react";
import { connect } from "react-redux";
import { Dispatch } from "redux";

import { NavigationEnabledComponentConstructor } from "../presentation/util/NavMap";

import { CredentialDocument } from "../model/CredentialDocument";
import { RecentActivity } from "../model/RecentActivity";
import { RequestDocument } from "../model/RequestDocument";
import { ServiceCallState } from "../services/ServiceStateStore";

import { NormalizedStoreContent, PersistedStoreContent } from "./normalizedStore";
import { sampleRecentActivity } from "./samples/sampleRecentActivity";
import { combinedIdentitySelector, ValidatedIdentity } from "./selector/combinedIdentitySelector";
import {
	activeSpecialCredentialsSelector,
	SpecialCredentialMap,
	toplevelCredentialSelector
} from "./selector/credentialSelector";
import { parsedTokenSelector } from "./selector/parsedTokenSelector";
import { requestSelector } from "./selector/requestSelector";
import { StoreAction } from "./StoreAction";

export interface StoreContent extends PersistedStoreContent {
	parsedTokens: Array<CredentialDocument | RequestDocument>;
	credentials: CredentialDocument[];
	activeSpecialCredentials: SpecialCredentialMap;
	requests: RequestDocument[];

	serviceCalls: ServiceCallState;

	identity: ValidatedIdentity;

	recentActivity: RecentActivity[];
}

export function denormalizeStore(store: NormalizedStoreContent): StoreContent {
	return {
		...store.persisted,

		parsedTokens: parsedTokenSelector(store),
		credentials: toplevelCredentialSelector(store),
		activeSpecialCredentials: activeSpecialCredentialsSelector(store),
		requests: requestSelector(store),

		serviceCalls: store.serviceCalls,

		identity: combinedIdentitySelector(store),

		recentActivity: sampleRecentActivity
	};
}

function mapState<StateProps>(mapStateToProps: (state: StoreContent) => StateProps) {
	return (state: NormalizedStoreContent): StateProps => {
		return mapStateToProps(denormalizeStore(state));
	};
}

type DidiConnectedComponent<C, StateProps, DispatchProps> = C extends NavigationEnabledComponentConstructor<
	infer FullProps_1,
	infer Navigation
>
	? NavigationEnabledComponentConstructor<Omit<FullProps_1, keyof StateProps | keyof DispatchProps>, Navigation>
	: C extends ComponentType<infer FullProps_2>
	? ComponentType<Omit<FullProps_2, keyof StateProps | keyof DispatchProps>>
	: never;

export function didiConnect<StateProps, C>(
	component: C,
	mapStateToProps: (state: StoreContent) => StateProps
): DidiConnectedComponent<C, StateProps, {}>;

export function didiConnect<StateProps, DispatchProps, C>(
	component: C,
	mapStateToProps: (state: StoreContent) => StateProps,
	mapDispatchToProps: (dispatch: Dispatch<StoreAction>) => DispatchProps
): DidiConnectedComponent<C, StateProps, DispatchProps>;

export function didiConnect(component: any, mapStateToProps: any, mapDispatchToProps?: any) {
	if (mapDispatchToProps) {
		return connect(mapState(mapStateToProps), mapDispatchToProps)(component);
	} else {
		return connect(mapState(mapStateToProps))(component);
	}
}
