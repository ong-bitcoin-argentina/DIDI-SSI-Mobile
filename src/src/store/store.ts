import { ComponentType } from "react";
import { connect, ConnectedComponent, GetProps, Matching } from "react-redux";
import { Dispatch } from "redux";

import { CredentialDocument } from "../model/CredentialDocument";
import { DerivedCredential } from "../model/DerivedCredential";
import { Identity } from "../model/Identity";
import { RecentActivity } from "../model/RecentActivity";
import { RequestDocument } from "../model/RequestDocument";
import { SampleDocument } from "../model/SampleDocument";
import { ServiceSettings } from "../model/ServiceSettings";
import { ServiceCallState } from "../services/ServiceStateStore";

import { NormalizedStoreContent, PersistedStoreContent } from "./normalizedStore";
import { sampleDocuments } from "./samples/sampleDocuments";
import { sampleIdentity } from "./samples/sampleIdentity";
import { sampleRecentActivity } from "./samples/sampleRecentActivity";
import { credentialSelector } from "./selector/credentialSelector";
import { microCredentialSelector } from "./selector/microCredentialSelector";
import { parsedTokenSelector } from "./selector/parsedTokenSelector";
import { requestSelector } from "./selector/requestSelector";
import { StoreContent } from "./store";
import { StoreAction } from "./StoreAction";

export interface StoreContent extends PersistedStoreContent {
	parsedTokens: Array<CredentialDocument | RequestDocument>;
	microCredentials: CredentialDocument[];
	credentials: Array<DerivedCredential<CredentialDocument>>;
	requests: RequestDocument[];

	serviceCalls: ServiceCallState;

	samples: SampleDocument[];
	identity: Identity;
	recentActivity: RecentActivity[];
}

function mapState<StateProps>(mapStateToProps: (state: StoreContent) => StateProps) {
	return (state: NormalizedStoreContent): StateProps => {
		return mapStateToProps({
			...state.persisted,

			parsedTokens: parsedTokenSelector(state),
			credentials: credentialSelector(state),
			microCredentials: microCredentialSelector(state),
			requests: requestSelector(state),

			serviceCalls: state.serviceCalls,

			identity: sampleIdentity,
			recentActivity: sampleRecentActivity,
			samples: sampleDocuments
		});
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
		return connect(
			mapState(mapStateToProps),
			mapDispatchToProps
		)(component);
	} else {
		return connect(mapState(mapStateToProps))(component);
	}
}
