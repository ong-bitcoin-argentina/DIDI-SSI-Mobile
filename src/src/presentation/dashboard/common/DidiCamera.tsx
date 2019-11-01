import React, { Fragment } from "react";
import { GestureResponderEvent, StyleSheet, Text, TouchableOpacity, View, ViewProps } from "react-native";
import { RNCamera, TakePictureResponse } from "react-native-camera";

import colors from "../../resources/colors";
import Checkmark from "../resources/images/checkmark.svg";

export interface DidiCameraProps {
	onPictureTaken(response: TakePictureResponse): void;
}
interface DidiCameraState {
	cameraAvailable: boolean;
	pictureResponse?: TakePictureResponse;
}

export default class DidiCamera extends React.Component<DidiCameraProps, DidiCameraState> {
	constructor(props: DidiCameraProps) {
		super(props);
		this.state = {
			cameraAvailable: false
		};
	}

	private camera: RNCamera | null = null;

	static cameraButton(onPress?: (event: GestureResponderEvent) => void) {
		return (
			<TouchableOpacity style={styles.cameraButton} onPress={onPress}>
				<Text style={styles.cameraIcon}></Text>
			</TouchableOpacity>
		);
	}

	render() {
		return (
			<Fragment>
				<RNCamera
					style={styles.body}
					ref={ref => (this.camera = ref)}
					captureAudio={false}
					type={RNCamera.Constants.Type.back}
					flashMode={RNCamera.Constants.FlashMode.auto}
					androidCameraPermissionOptions={{
						title: "Permiso para acceder a la camara",
						message: "Didi necesita poder capturar imagenes de documentos",
						buttonPositive: "Ok",
						buttonNegative: "Cancelar"
					}}
					notAuthorizedView={<Text style={styles.notAuthorized}>Camara no autorizada</Text>}
					onCameraReady={() => this.setState({ cameraAvailable: true })}
				/>
				<View style={[StyleSheet.absoluteFill, styles.cameraButtonContainer]}>{this.renderPictureButton()}</View>
			</Fragment>
		);
	}

	private renderPictureButton() {
		if (!this.state.cameraAvailable) {
			return null;
		}

		const picture = this.state.pictureResponse;
		if (picture) {
			return (
				<TouchableOpacity style={styles.cameraButton} onPress={() => this.props.onPictureTaken(picture)}>
					<Checkmark width="100%" height="100%" />
				</TouchableOpacity>
			);
		} else {
			return DidiCamera.cameraButton(() => this.takePicture());
		}
	}

	private async takePicture() {
		if (this.camera) {
			const options = { quality: 0.5, base64: true };
			const data = await this.camera.takePictureAsync(options);
			this.setState({ pictureResponse: data });
		}
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
	cameraButtonContainer: {
		margin: 30,
		alignItems: "center",
		justifyContent: "flex-end"
	},
	cameraButton: {
		width: 66,
		height: 66,
		backgroundColor: colors.primary,
		borderRadius: 33,
		justifyContent: "center",
		alignItems: "center",
		alignSelf: "center"
	},
	cameraIcon: {
		fontSize: 33,
		fontFamily: "MaterialIcons-Regular",
		color: colors.primaryText,
		textAlign: "center"
	}
});
