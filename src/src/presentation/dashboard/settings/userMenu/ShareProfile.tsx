import React from "react";
import { StyleSheet, Text, View } from "react-native";

import { DidiScreen } from "../../../common/DidiScreen";
import NavigationHeaderStyle from "../../../common/NavigationHeaderStyle";
import DidiButton from "../../../util/DidiButton";
import NavigationEnabledComponent from "../../../util/NavigationEnabledComponent";

import { ValidatedIdentity } from "../../../../store/selector/combinedIdentitySelector";
import { didiConnect } from "../../../../store/store";
import strings from "../../../resources/strings";

export type ShareProfileProps = {};
interface ShareProfileInternalProps {
	person: ValidatedIdentity;
}

type ShareProfileState = {
	personalData: boolean;
	family: boolean;
	courses: boolean;
	jobs: boolean;
	titles: boolean;
	others: boolean;
};
export interface ShareProfileNavigation {}

class ShareProfileScreen extends NavigationEnabledComponent<
	ShareProfileInternalProps,
	ShareProfileState,
	ShareProfileNavigation
> {
	static navigationOptions = NavigationHeaderStyle.withTitle(strings.userData.share.barTitle);

	private canPressContinueButton(): boolean {
		// TODO
		return true;
	}

	share() {
		// TODO
		this.goBack();
	}

	render() {
		return (
			<DidiScreen>
				<View style={styles.inputs}>
					<Text>{strings.debug.screenInProgress}</Text>
				</View>

				<View style={styles.button}>
					<DidiButton
						onPress={() => {
							this.share();
						}}
						disabled={!this.canPressContinueButton()}
						title={strings.userData.share.share}
					/>
				</View>
			</DidiScreen>
		);
	}
}

const connected = didiConnect(
	ShareProfileScreen,
	(state): ShareProfileInternalProps => {
		return {
			person: state.validatedIdentity
		};
	}
);
export { connected as ShareProfileScreen };

const styles = StyleSheet.create({
	inputs: {
		marginTop: 30,
		flex: 1
	},
	button: {
		marginBottom: 30,
		flex: 0
	}
});
