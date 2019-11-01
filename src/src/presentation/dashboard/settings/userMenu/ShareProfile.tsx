import React from "react";
import { StyleSheet, Text, View } from "react-native";

import { DidiScreen } from "../../../common/DidiScreen";
import DidiButton from "../../../util/DidiButton";
import NavigationEnabledComponent from "../../../util/NavigationEnabledComponent";

import { Identity } from "../../../../model/Identity";
import { didiConnect } from "../../../../store/store";
import NavigationHeaderStyle from "../../../resources/NavigationHeaderStyle";
import strings from "../../../resources/strings";

export type ShareProfileProps = {};
interface ShareProfileInternalProps {
	person: Identity;
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
	static navigationOptions = NavigationHeaderStyle.withTitle(strings.dashboard.userData.share.barTitle);

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
					<Text>TODO!!</Text>
				</View>

				<View style={styles.button}>
					<DidiButton
						onPress={() => {
							this.share();
						}}
						disabled={!this.canPressContinueButton()}
						title={strings.dashboard.userData.share.share}
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
			person: state.identity
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
