import React, { Fragment } from "react";
import { Text, StyleSheet, View } from "react-native";
import { RNCamera } from "react-native-camera";

export interface DidiQRScannerProps {
	onQRScanned(content: string): void;
}
interface DidiQRScannerState {
	cameraAvailable: boolean;
}

export default class DidiQRScanner extends React.Component<DidiQRScannerProps, DidiQRScannerState> {
	constructor(props: DidiQRScannerProps) {
		super(props);
		this.state = {
			cameraAvailable: false
		};
	}

	render() {
		return (
			<Fragment>
				<RNCamera
					style={styles.body}
					captureAudio={false}
					type={RNCamera.Constants.Type.back}
					flashMode={RNCamera.Constants.FlashMode.auto}
					androidCameraPermissionOptions={{
						title: "Permiso para acceder a la camara",
						message: "Didi necesita poder capturar imagenes de documentos",
						buttonPositive: "Ok",
						buttonNegative: "Cancelar"
					}}
					onBarCodeRead={event => this.onBarCodeRead(event.data)}
					notAuthorizedView={<Text style={styles.notAuthorized}>Camara no autorizada</Text>}
					onCameraReady={() => this.setState({ cameraAvailable: true })}
				/>
				<View style={[StyleSheet.absoluteFill, styles.cameraInstructionContainer]}>
					<Text style={styles.cameraInstruction}>Escanea un codigo QR</Text>
				</View>
			</Fragment>
		);
	}

	private onBarCodeRead(content: string) {
		this.props.onQRScanned(content);
	}
}

const styles = StyleSheet.create({
	body: {
		alignSelf: "stretch",
		justifyContent: "space-evenly",
		flex: 1
	},
	notAuthorized: {
		textAlignVertical: "center",
		flex: 1
	},
	cameraInstructionContainer: {
		margin: 30,
		alignItems: "center",
		justifyContent: "flex-end"
	},
	cameraInstruction: {
		width: "100%",
		height: 66,
		textAlign: "center",
		textAlignVertical: "center",
		color: "#FFF",
		fontSize: 20
	}
});
