import JwtDecode from "jwt-decode";
import React, { Fragment } from "react";
import { Alert, StatusBar } from "react-native";

import NavigationHeaderStyle from "../../common/NavigationHeaderStyle";
import NavigationEnabledComponent from "../../util/NavigationEnabledComponent";
import { BarcodeType, DidiCamera } from "../common/DidiCamera";

import strings from "../../resources/strings";
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
	static navigationOptions = NavigationHeaderStyle.withTitle(strings.debug.decodeJWT);

	constructor(props: JWTDecoderScanScreenProps) {
		super(props);
		this.state = { paused: false };
	}

	render() {
		return (
			<Fragment>
				<StatusBar backgroundColor={themes.darkNavigation} barStyle="light-content" />
				<DidiCamera
					onBarcodeScanned={(content, type) => this.onScan(content, type)}
					explanation={strings.camera.scanQRInstruction}
				/>
			</Fragment>
		);
	}

	private onScan(content: string, type: BarcodeType) {
		if (this.state.paused) {
			return;
		}

		if (type === "qr") {
			this.onScanQR(content);
		} else if (type === "pdf417") {
			this.show("PDF417", content);
		}
	}

	private onScanQR(content: string) {
		const startIndex = content.lastIndexOf("/");
		const endIndex = content.lastIndexOf("?");
		const toParse = content.substring(startIndex === -1 ? 0 : startIndex + 1, endIndex === -1 ? undefined : endIndex);

		try {
			this.show("JWT", JSON.stringify(JwtDecode(toParse), undefined, 4));
		} catch (e) {
			this.show("No se pudo leer como JWT", content);
		}
	}

	private show(title: string, subtitle: string) {
		const unpause = () => this.setState({ paused: false });

		this.setState({ paused: true });
		Alert.alert(title, subtitle, [{ text: "OK", onPress: unpause }], {
			onDismiss: unpause
		});
	}
}
