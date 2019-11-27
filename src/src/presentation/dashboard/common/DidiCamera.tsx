import React, { Fragment } from "react";
import { GestureResponderEvent, StyleSheet, Text, TouchableOpacity, View, ViewProps } from "react-native";
import { RNCamera, TakePictureResponse } from "react-native-camera";

import { DidiText } from "../../util/DidiText";

import colors from "../../resources/colors";
import Checkmark from "../../resources/images/cameraCheckmark.svg";
import strings from "../../resources/strings";

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
				<DidiText.Icon fontSize={33}></DidiText.Icon>
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
					notAuthorizedView={
						<DidiText.CameraExplanation style={styles.notAuthorized}>
							{strings.camera.notAuthorized}
						</DidiText.CameraExplanation>
					}
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
		width: 80,
		height: 80,
		backgroundColor: colors.primary,
		borderRadius: 40,
		justifyContent: "center",
		alignItems: "center",
		alignSelf: "center"
	}
});
