import NavigationEnabledComponent from "../../util/NavigationEnabledComponent";
import { Fragment, Dispatch } from "react";
import React from "react";
import { StatusBar, SafeAreaView, View, Text, ScrollView, TouchableOpacity, Clipboard } from "react-native";
import commonStyles from "../../access/resources/commonStyles";
import themes from "../../resources/themes";
import NavigationHeaderStyle from "../../resources/NavigationHeaderStyle";
import strings from "../../resources/strings";
import { DashboardScreenProps } from "../home/Dashboard";
import { TrustGraphClient } from "../../../uPort/TrustGraphClient";
import DidiButton from "../../util/DidiButton";
import { connect } from "react-redux";
import { UPortDocument } from "../../../model/data/UPortDocument";
import StoreAction from "../../../model/StoreAction";
import parseJWT from "../../../uPort/parseJWT";
import { StoreContent } from "../../../model/store";
import { isLeft, isRight, either } from "fp-ts/lib/Either";
import TypedArray from "../../../util/TypedArray";

export interface RoundsScreenNavigation {
	DashboardHome: DashboardScreenProps;
}
export type RoundsScreenProps = {};
interface RoundsStateProps {
	documents: UPortDocument[];
}
interface RoundsDispatchProps {
	recoverDocuments(docs: UPortDocument[]): void;
	deleteAllDocuments(): void;
}
type RoundsScreenInternalProps = RoundsScreenProps & RoundsStateProps & RoundsDispatchProps;

interface RoundsScreenState {
	docs?: string[];
}

class RoundsScreen extends NavigationEnabledComponent<
	RoundsScreenInternalProps,
	RoundsScreenState,
	RoundsScreenNavigation
> {
	static navigationOptions = NavigationHeaderStyle.withTitleAndFakeBackButton<RoundsScreenNavigation, "DashboardHome">(
		strings.tabNames.rounds,
		"DashboardHome",
		{}
	);

	constructor(props: RoundsScreenInternalProps) {
		super(props);
		this.state = {};
	}

	render() {
		const currentDocs = this.state.docs || [];
		return (
			<Fragment>
				<StatusBar backgroundColor={themes.darkNavigation} barStyle="light-content" />
				<SafeAreaView style={commonStyles.view.area}>
					<ScrollView
						style={{ width: "100%" }}
						contentContainerStyle={{ alignItems: "stretch", justifyContent: "space-evenly", flex: 1 }}
					>
						<DidiButton title="Delete Local Docs" onPress={() => this.props.deleteAllDocuments()} />
						<DidiButton title="Load Remote Docs" onPress={() => this.loadRemoteDocs()} />
						{currentDocs.length > 0 && (
							<DidiButton title="Add Remote to Local Docs" onPress={() => this.addToLocalDocs(currentDocs)} />
						)}
					</ScrollView>
				</SafeAreaView>
			</Fragment>
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
	(store: StoreContent): RoundsStateProps => {
		return { documents: store.documents };
	},
	(dispatch: Dispatch<StoreAction>): RoundsDispatchProps => {
		return {
			recoverDocuments: (docs: UPortDocument[]) => dispatch({ type: "DOCUMENT_ENSURE", content: docs }),
			deleteAllDocuments: () => dispatch({ type: "DOCUMENT_DELETE_ALL" })
		};
	}
)(RoundsScreen);

export { connected as RoundsScreen };
