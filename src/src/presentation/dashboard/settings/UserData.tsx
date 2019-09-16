import { View, StyleSheet, ViewProps, Text, ScrollView } from "react-native";
import React from "react";
import NavigationEnabledComponent from "../../util/NavigationEnabledComponent";
import NavigationHeaderStyle from "../../resources/NavigationHeaderStyle";
import DropdownMenu from "../../util/DropdownMenu";
import strings from "../../resources/strings";
import PersonalData, { PersonalDataStatus } from "./PersonalData";
import colors from "../../resources/colors";
import themes from "../../resources/themes";

export interface UserDataProps extends ViewProps {
	personalData: Array<{ label: string; value: string; state: PersonalDataStatus }>;
}

export default class UserDataScreen extends NavigationEnabledComponent<UserDataProps, {}, {}> {
	static navigationOptions = NavigationHeaderStyle.withTitle("Home");

	renderState() {
		return (
			<ScrollView>
				<View>
					<DropdownMenu
						color={colors.primary}
						textColor={colors.secondaryText}
						style={styles.personalDataDropdown}
						label={strings.dashboard.userData.personalDataLabel}
						round={true}
					>
						<View style={styles.dropdownContents}>
							{this.props.personalData.map((data, index) => {
								return (
									<PersonalData
										key={index}
										label={data.label}
										value={data.value}
										state={data.state}
										style={styles.personalDataElement}
									/>
								);
							})}
						</View>
					</DropdownMenu>
				</View>
			</ScrollView>
		);
	}

	render() {
		return <View>{this.renderState()}</View>;
	}
}

const styles = StyleSheet.create({
	personalDataDropdown: {
		marginTop: 20,
		marginLeft: 10,
		marginRight: 10
	},
	dropdownContents: {
		backgroundColor: themes.buttonDisabled,
		marginTop: -20,
		marginLeft: 10,
		marginRight: 10
	},
	personalDataElement: {
		marginBottom: 10
	}
});
