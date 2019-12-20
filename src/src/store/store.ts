import { ComponentType } from "react";
import { connect, ConnectedComponent, GetProps, Matching } from "react-redux";
import { Dispatch } from "redux";

import { CredentialDocument } from "../model/CredentialDocument";
import { RecentActivity } from "../model/RecentActivity";
import { RequestDocument } from "../model/RequestDocument";
import { SampleDocument } from "../model/SampleDocument";
import { ServiceCallState } from "../services/ServiceStateStore";

import { NormalizedStoreContent, PersistedStoreContent } from "./normalizedStore";
import { sampleDocuments } from "./samples/sampleDocuments";
import { sampleRecentActivity } from "./samples/sampleRecentActivity";
import { combinedIdentitySelector, ValidatedIdentity } from "./selector/combinedIdentitySelector";
import { toplevelCredentialSelector } from "./selector/credentialSelector";
import { parsedTokenSelector } from "./selector/parsedTokenSelector";
import { requestSelector } from "./selector/requestSelector";
import { StoreAction } from "./StoreAction";

export interface StoreContent extends PersistedStoreContent {
	parsedTokens: Array<CredentialDocument | RequestDocument>;
	credentials: CredentialDocument[];
	requests: RequestDocument[];

	serviceCalls: ServiceCallState;

	identity: ValidatedIdentity;

	recentActivity: RecentActivity[];
	samples: SampleDocument[];
}

export function denormalizeStore(store: NormalizedStoreContent): StoreContent {
	return {
		...store.persisted,

		parsedTokens: parsedTokenSelector(store),
		credentials: toplevelCredentialSelector(store),
		requests: requestSelector(store),

		serviceCalls: store.serviceCalls,

		identity: combinedIdentitySelector(store),

		recentActivity: sampleRecentActivity,
		samples: sampleDocuments
	};
}

function mapState<StateProps>(mapStateToProps: (state: StoreContent) => StateProps) {
	return (state: NormalizedStoreContent): StateProps => {
		return mapStateToProps(denormalizeStore(state));
	};
}

export function didiConnect<StateProps, Component extends ComponentType<Matching<StateProps, GetProps<Component>>>>(
	component: Component,
	mapStateToProps: (state: StoreContent) => StateProps
): ConnectedComponent<Component, Omit<GetProps<Component>, keyof StateProps>>;

export function didiConnect<
	StateProps,
	DispatchProps,
	Component extends ComponentType<Matching<StateProps & DispatchProps, GetProps<Component>>>
>(
	component: Component,
	mapStateToProps: (state: StoreContent) => StateProps,
	mapDispatchToProps: (dispatch: Dispatch<StoreAction>) => DispatchProps
): ConnectedComponent<Component, Omit<GetProps<Component>, keyof StateProps | keyof DispatchProps>>;

export function didiConnect(component: any, mapStateToProps: any, mapDispatchToProps?: any) {
	if (mapDispatchToProps) {
		return connect(mapState(mapStateToProps), mapDispatchToProps)(component);
	} else {
		return connect(mapState(mapStateToProps))(component);
	}
}
