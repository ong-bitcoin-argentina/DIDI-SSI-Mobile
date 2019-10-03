import NavigationEnabledComponent from "../../../util/NavigationEnabledComponent";
import { Fragment } from "react";
import React from "react";
import { StyleSheet, StatusBar, SafeAreaView, View, Text } from "react-native";
import NavigationHeaderStyle from "../../../resources/NavigationHeaderStyle";
import strings from "../../../resources/strings";
import { UserDataProps } from "../userData/UserData";
import themes from "../../../resources/themes";
import commonStyles from "../../../access/resources/commonStyles";
import DidiTextInput from "../../../util/DidiTextInput";
import DidiButton from "../../../util/DidiButton";
import { connect } from "react-redux";
import { Identity } from "../../../../model/data/Identity";
import { StoreContent } from "../../../../model/store";

export type ShareProps = {};
interface ShareInternalProps {
	person: Identity;
}

type ShareState = {
	personalData: boolean;
	family: boolean;
	courses: boolean;
	jobs: boolean;
	titles: boolean;
	others: boolean;
};
export interface ShareNavigation {
	UserData: UserDataProps;
}

class ShareScreen extends NavigationEnabledComponent<ShareInternalProps, ShareState, ShareNavigation> {
	static navigationOptions = NavigationHeaderStyle.withTitle(strings.dashboard.userData.share.barTitle);

	private canPressContinueButton(): boolean {
		// TODO
		return true;
	}

	share() {
		// TODO
		this.navigate("UserData", {});
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

export default connect(
	(state: StoreContent): ShareInternalProps => {
		return {
			person: state.identity
		};
	}
)(ShareScreen);

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
