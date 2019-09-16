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
	static navigationOptions = NavigationHeaderStyle.withTitle("Mi Perfil");

	renderState() {
		return (
			<ScrollView>
				<View>
					<DropdownMenu
						headerContainerStyle={{ backgroundColor: colors.primary }}
						headerTextStyle={{ color: colors.secondaryText }}
						style={styles.personalDataDropdown}
						label={strings.dashboard.userData.personalDataLabel}
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
		marginHorizontal: 10,
		borderRadius: 10,
		overflow: "hidden"
	},
	dropdownContents: {
		backgroundColor: colors.darkBackground
	},
	personalDataElement: {
		marginBottom: 10
	}
});
