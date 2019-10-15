import NavigationEnabledComponent from "../../../util/NavigationEnabledComponent";
import { Fragment } from "react";
import React from "react";
import { StyleSheet, StatusBar, SafeAreaView, View, Text } from "react-native";
import NavigationHeaderStyle from "../../../resources/NavigationHeaderStyle";
import strings from "../../../resources/strings";
import { UserDataProps } from "../userData/UserData";
import themes from "../../../resources/themes";
import commonStyles from "../../../access/resources/commonStyles";
import DidiButton from "../../../util/DidiButton";
import { connect } from "react-redux";
import { Identity } from "../../../../model/data/Identity";
import { StoreContent, didiConnect } from "../../../../model/store";

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
			<Fragment>
				<StatusBar backgroundColor={themes.darkNavigation} barStyle="light-content" />
				<SafeAreaView style={commonStyles.view.area}>
					<View style={commonStyles.view.body}>
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
					</View>
				</SafeAreaView>
			</Fragment>
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
