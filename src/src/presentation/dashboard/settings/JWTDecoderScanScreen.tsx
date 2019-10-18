import JwtDecode from "jwt-decode";
import React, { Fragment } from "react";
import { Alert, StatusBar } from "react-native";

import NavigationEnabledComponent from "../../util/NavigationEnabledComponent";
import DidiQRScanner from "../common/DidiQRScanner";

import NavigationHeaderStyle from "../../resources/NavigationHeaderStyle";
import themes from "../../resources/themes";

export type JWTDecoderScanScreenProps = {};
type JWTDecoderScanScreenState = {
	paused: boolean;
};
export type JWTDecoderScanScreenNavigation = {};

export class JWTDecoderScanScreen extends NavigationEnabledComponent<
	JWTDecoderScanScreenProps,
	JWTDecoderScanScreenState,
	JWTDecoderScanScreenNavigation
> {
	static navigationOptions = NavigationHeaderStyle.withTitle("Acerca de Didi");

	constructor(props: JWTDecoderScanScreenProps) {
		super(props);
		this.state = { paused: false };
	}

	render() {
		return (
			<Fragment>
				<StatusBar backgroundColor={themes.darkNavigation} barStyle="light-content" />
				<DidiQRScanner onQRScanned={content => this.onScanQR(content)} />
			</Fragment>
		);
	}

	private onScanQR(content: string) {
		if (this.state.paused) {
			return;
		}

		const startIndex = content.lastIndexOf("/");
		const endIndex = content.lastIndexOf("?");
		const toParse = content.substring(startIndex === -1 ? 0 : startIndex + 1, endIndex === -1 ? undefined : endIndex);

		const unpause = () => this.setState({ paused: false });

		this.setState({ paused: true });
		try {
			Alert.alert("JWT", JSON.stringify(JwtDecode(toParse), undefined, 4), [{ text: "OK", onPress: unpause }], {
				onDismiss: unpause
			});
		} catch (e) {
			Alert.alert("No se pudo leer como JWT", content, [{ text: "OK", onPress: unpause }], {
				onDismiss: unpause
			});
		}
	}
}
