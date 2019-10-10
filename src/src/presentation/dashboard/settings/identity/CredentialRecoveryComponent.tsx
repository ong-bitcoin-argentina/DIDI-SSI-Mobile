import React from "react";
import { View, Text } from "react-native";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import { isLeft } from "fp-ts/lib/Either";

import StoreAction from "../../../../model/StoreAction";
import { StoreContent } from "../../../../model/store";
import { UPortDocument } from "../../../../model/data/UPortDocument";
import parseJWT from "../../../../uPort/parseJWT";
import { TrustGraphClient } from "../../../../uPort/TrustGraphClient";
import TypedArray from "../../../../util/TypedArray";
import DidiButton from "../../../util/DidiButton";
import commonStyles from "../../../access/resources/commonStyles";

export type CredentialRecoveryProps = {};
interface CredentialRecoveryStateProps {
	documents: UPortDocument[];
}
interface CredentialRecoveryDispatchProps {
	recoverDocuments(docs: UPortDocument[]): void;
	deleteAllDocuments(): void;
}
type CredentialRecoveryInternalProps = CredentialRecoveryProps &
	CredentialRecoveryStateProps &
	CredentialRecoveryDispatchProps;

interface CredentialRecoverState {
	docs?: string[];
}

class CredentialRecoveryComponent extends React.Component<CredentialRecoveryInternalProps, CredentialRecoverState> {
	constructor(props: CredentialRecoveryInternalProps) {
		super(props);
		this.state = {};
	}

	render() {
		const currentDocs = this.state.docs || [];
		return (
			<View>
				<Text style={commonStyles.text.normal}>
					<Text style={commonStyles.text.emphasis}>Credenciales Locales: </Text>
					{this.props.documents.length}
				</Text>

				<Text style={commonStyles.text.normal}>
					<Text style={commonStyles.text.emphasis}>Credenciales Remotas: </Text>
					{this.state.docs === undefined ? "Sin Cargar" : this.state.docs.length}
				</Text>

				<DidiButton title="Borrar Credenciales Locales" onPress={() => this.props.deleteAllDocuments()} />
				<DidiButton title="Cargar Credenciales Remotas" onPress={() => this.loadRemoteDocs()} />
				{currentDocs.length > 0 && (
					<DidiButton title="Agregar Credenciales Remotas a Locales" onPress={() => this.addToLocalDocs(currentDocs)} />
				)}
			</View>
		);
	}

	private async loadRemoteDocs() {
		const tg = await TrustGraphClient.create();
		const docs = await tg.getJWTs();
		this.setState({ docs });
	}

	private async addToLocalDocs(received: string[]) {
		const parseToken = async (token: string): Promise<UPortDocument | undefined> => {
			if (this.props.documents.find(doc => token === doc.jwt)) {
				return undefined;
			}

			const parsed = await parseJWT(token);
			if (isLeft(parsed)) {
				throw parsed.left;
			} else if (parsed.right.type === "VerifiedClaim") {
				return {
					jwt: token,
					claim: parsed.right
				};
			} else {
				return undefined;
			}
		};

		const docs = TypedArray.flatMap(await Promise.all(received.map(parseToken)), x => x);
		this.props.recoverDocuments(docs);
	}
}

const connected = connect(
	(store: StoreContent): CredentialRecoveryStateProps => {
		return { documents: store.documents };
	},
	(dispatch: Dispatch<StoreAction>): CredentialRecoveryDispatchProps => {
		return {
			recoverDocuments: (docs: UPortDocument[]) => dispatch({ type: "DOCUMENT_ENSURE", content: docs }),
			deleteAllDocuments: () => dispatch({ type: "DOCUMENT_DELETE_ALL" })
		};
	}
)(CredentialRecoveryComponent);

export { connected as CredentialRecoveryComponent };
