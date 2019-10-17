import { ComponentType } from "react";
import { connect, Matching, GetProps, ConnectedComponent } from "react-redux";
import { Dispatch } from "redux";
import { Either } from "fp-ts/lib/Either";

import { StoreContent, StoreAction } from "./store";
import { NormalizedStoreContent, NormalizedStoreAction } from "./normalizedStore";

import { sampleIdentity } from "./samples/sampleIdentity";
import { sampleRecentActivity } from "./samples/sampleRecentActivity";
import { sampleDocuments } from "./samples/sampleDocuments";

import { parsedTokenSelector } from "./selector/parsedTokenSelector";
import { credentialSelector } from "./selector/credentialSelector";
import { requestSelector } from "./selector/requestSelector";

import { SampleDocument } from "../model/SampleDocument";
import { Identity } from "../model/Identity";
import { RecentActivity } from "../model/RecentActivity";
import { CredentialDocument } from "../model/CredentialDocument";
import { RequestDocument } from "../model/RequestDocument";
import { DerivedCredential } from "../model/DerivedCredential";
import { microCredentialSelector } from "./selector/microCredentialSelector";

export type StoreAction = NormalizedStoreAction;

export interface StoreContent extends NormalizedStoreContent {
	credentials: Array<DerivedCredential<CredentialDocument>>;
	microCredentials: CredentialDocument[];
	requests: RequestDocument[];
	parsedTokens: Array<Either<any, CredentialDocument | RequestDocument>>;
	samples: SampleDocument[];
	identity: Identity;
	recentActivity: RecentActivity[];
}

function mapState<StateProps>(mapStateToProps: (state: StoreContent) => StateProps) {
	return (state: NormalizedStoreContent): StateProps => {
		return mapStateToProps({
			...state,
			credentials: credentialSelector(state),
			microCredentials: microCredentialSelector(state),
			requests: requestSelector(state),
			parsedTokens: parsedTokenSelector(state),
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
