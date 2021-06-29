import React from "react";
import { Image, ImageSourcePropType, StyleSheet, View } from "react-native";

import commonStyles from "../resources/commonStyles";
import { DidiServiceButton } from "../util/DidiServiceButton";
import { DidiText } from "../util/DidiText";
import DidiTextInput from "../util/DidiTextInput";

import { Validations } from "../../model/Validations";
import { countries } from "../resources/countries";
import strings from "../resources/strings";

import { DidiScreen } from "./DidiScreen";

export interface EnterPhoneProps {
	explanation: string;
	contentImageSource: ImageSourcePropType;
	isPasswordRequired: boolean;
	onPressContinueButton(inputPhoneNumber: string, password: string | null): void;
	isContinuePending: boolean;
}

export interface EnterPhoneState {
	inputCountryCode?: string;
	inputPhoneNumber?: string;
	inputPassword?: string;
}

export class EnterPhoneScreen extends React.PureComponent<EnterPhoneProps, EnterPhoneState> {
	constructor(props: EnterPhoneProps) {
		super(props);
		this.state = {};
	}

	render() {
		const country = this.state.inputCountryCode
			? countries.find(c => c.prefix === this.state.inputCountryCode)
			: countries[0];
		return (
			<DidiScreen>
				<DidiText.Explanation.Emphasis>{this.props.explanation}</DidiText.Explanation.Emphasis>

				<View style={styles.countryContainer}>
					<View style={{ flex: 1 }}>
						{country && (
							<View style={{ flexDirection: "row", justifyContent: "center", alignItems: "center" }}>
								{country.image && <Image style={styles.countryImage} source={country.image} />}
								<DidiText.Explanation.Normal>{country.name}</DidiText.Explanation.Normal>
							</View>
						)}
					</View>

					<View style={{ flex: 1, alignItems: "center" }}>
						<DidiTextInput
							viewProps={{ style: { width: 100 } }}
							description={strings.accessCommon.enterPhone.countryCode}
							placeholder="54"
							textInputProps={{
								onChangeText: inputCountryCode => this.setState({ inputCountryCode })
							}}
						/>
					</View>
				</View>

				<DidiTextInput.PhoneNumber onChangeText={inputPhoneNumber => this.setState({ inputPhoneNumber })} />

				{this.props.isPasswordRequired && (
					<DidiTextInput.Password
						descriptionType="BASIC"
						onChangeText={text => this.setState({ inputPassword: text })}
					/>
				)}

				<Image style={commonStyles.image.image} source={this.props.contentImageSource} />

				<DidiServiceButton
					isPending={this.props.isContinuePending || false}
					disabled={!this.canPressContinueButton()}
					onPress={() => this.onPressContinueButton()}
					title={strings.accessCommon.validateButtonText}
				/>
			</DidiScreen>
		);
	}

	private canPressContinueButton(): boolean {
		return (
			Validations.isPhoneNumber(this.state.inputPhoneNumber) &&
			(!this.props.isPasswordRequired || Validations.isPassword(this.state.inputPassword))
		);
	}

	private onPressContinueButton() {
		const countryPrefix = this.state.inputCountryCode ?? countries[0].prefix;
		const phoneNumber = `+${countryPrefix}${this.state.inputPhoneNumber!}`;
		this.props.onPressContinueButton(phoneNumber, this.state.inputPassword || null);
	}
}

const styles = StyleSheet.create({
	countryContainer: {
		alignSelf: "stretch",
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-around"
	},
	countryImage: {
		width: 30,
		height: 30,
		marginRight: 10
	}
});
