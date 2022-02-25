import React from "react";
import { Text, View } from "react-native";
import { DidiScrollScreen } from "../../common/DidiScreen";
import NavigationHeaderStyle from "../../common/NavigationHeaderStyle";
import NavigationEnabledComponent from "../../util/NavigationEnabledComponent";
import strings from "../../resources/strings";



export class VuIdentitySubmitScreen extends NavigationEnabledComponent<{}, {}, {}> {
	static navigationOptions = NavigationHeaderStyle.withTitle(strings.validateIdentity.header);

	render() {
		const documentDataKeys = ["dni", "gender", "firstNames", "lastNames", "birthDate", "tramitId"] as const;

		return (
			<DidiScrollScreen>
				<View>
					{documentDataKeys.map(key => (
						<Text key={key}>
							{strings.validateIdentity.submit.items[key]}: {"resultado"}
						</Text>
					))}
				</View>				
			</DidiScrollScreen>
		);
	}
}

