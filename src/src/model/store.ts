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

import { SampleDocument } from "./data/SampleDocument";
import { Identity } from "./data/Identity";
import { RecentActivity } from "./data/RecentActivity";
import { CredentialDocument } from "./data/CredentialDocument";
import { RequestDocument } from "./data/RequestDocument";

export type StoreAction = NormalizedStoreAction;

export interface StoreContent extends NormalizedStoreContent {
	credentials: CredentialDocument[];
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
