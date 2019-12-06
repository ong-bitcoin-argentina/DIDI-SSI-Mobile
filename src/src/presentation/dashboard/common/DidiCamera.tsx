import React, { Fragment } from "react";
import { GestureResponderEvent, StyleSheet, Text, TouchableOpacity, View, ViewProps } from "react-native";
import { RNCamera, RNCameraProps, TakePictureResponse } from "react-native-camera";

import { DidiText } from "../../util/DidiText";

import colors from "../../resources/colors";
import Checkmark from "../../resources/images/cameraCheckmark.svg";
import strings from "../../resources/strings";
import themes from "../../resources/themes";

type BarcodeEvent = Parameters<NonNullable<RNCameraProps["onBarCodeRead"]>>[0];
export type BarcodeType = BarcodeEvent["type"];

interface CommonProps {
	cameraLocation?: keyof typeof RNCamera.Constants.Type;
	cameraFlash?: keyof typeof RNCamera.Constants.FlashMode;
}
interface PictureProps {
	cameraButtonDisabled?: boolean;
	onPictureTaken(response: TakePictureResponse): void;
}
interface BarcodeProps {
	onBarcodeScanned(content: string, type: BarcodeType): void;
}
export type DidiCameraProps = CommonProps &
	((PictureProps & Partial<BarcodeProps>) | (Partial<PictureProps> & BarcodeProps));

interface DidiCameraState {
	cameraAvailable: boolean;
	pictureResponse?: TakePictureResponse;
}

export class DidiCamera extends React.Component<DidiCameraProps, DidiCameraState> {
	constructor(props: DidiCameraProps) {
		super(props);
		this.state = {
			cameraAvailable: false
		};
	}

	private camera: RNCamera | null = null;

	static cameraButton(onPress: (event: GestureResponderEvent) => void, disabled: boolean = false) {
		return (
			<TouchableOpacity
				disabled={disabled}
				style={[styles.cameraButton, disabled ? styles.cameraButtonDisabled : undefined]}
				onPress={onPress}
			>
				<DidiText.Icon fontSize={33} color={disabled ? themes.buttonDisabledText : undefined}>
					
				</DidiText.Icon>
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
					type={RNCamera.Constants.Type[this.props.cameraLocation || "back"]}
					flashMode={RNCamera.Constants.FlashMode[this.props.cameraFlash || "auto"]}
					androidCameraPermissionOptions={{
						title: "Permiso para acceder a la camara",
						message: "Didi necesita poder capturar imagenes de documentos",
						buttonPositive: "Ok",
						buttonNegative: "Cancelar"
					}}
					onBarCodeRead={this.props.onBarcodeScanned ? event => this.onBarCodeRead(event) : undefined}
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

		if (this.props.onPictureTaken) {
			const picture = this.state.pictureResponse;
			const callback = this.props.onPictureTaken;
			if (picture) {
				return (
					<TouchableOpacity style={styles.cameraButton} onPress={() => callback(picture)}>
						<Checkmark width="100%" height="100%" />
					</TouchableOpacity>
				);
			} else {
				return DidiCamera.cameraButton(() => this.takePicture(), this.props.cameraButtonDisabled);
			}
		} else {
			return (
				<DidiText.CameraExplanation style={styles.cameraInstruction}>
					{strings.camera.scanQRInstruction}
				</DidiText.CameraExplanation>
			);
		}
	}

	private onBarCodeRead(content: BarcodeEvent) {
		if (!this.props.onBarcodeScanned) {
			return;
		}

		const typeMap: { [name: string]: BarcodeType } = {
			QR_CODE: "qr",
			PDF_417: "pdf417"
		};
		this.props.onBarcodeScanned(content.data, typeMap[content.type] || content.type);
	}

	private async takePicture() {
		if (this.camera) {
			const data = await this.camera.takePictureAsync({
				quality: 0.5,
				base64: true,
				pauseAfterCapture: true
			});
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
	},
	cameraButtonDisabled: {
		backgroundColor: themes.buttonDisabled
	},
	cameraInstruction: {
		width: "100%",
		height: 66,
		textAlignVertical: "center"
	}
});
