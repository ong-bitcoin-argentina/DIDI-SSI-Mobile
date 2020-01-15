import React, { Fragment } from "react";
import { GestureResponderEvent, LayoutRectangle, StyleSheet, TouchableOpacity, View } from "react-native";
import { Face, RNCamera, RNCameraProps, TakePictureResponse } from "react-native-camera";

import { DidiText } from "../../util/DidiText";

import colors from "../../resources/colors";
import strings from "../../resources/strings";
import themes from "../../resources/themes";

type BarcodeEvent = Parameters<NonNullable<RNCameraProps["onBarCodeRead"]>>[0];
export type BarcodeType = BarcodeEvent["type"];

interface CommonProps {
	onCameraLayout?: (rect: LayoutRectangle) => void;
	cameraLocation?: keyof typeof RNCamera.Constants.Type;
}
interface PictureProps {
	cameraButtonDisabled?: boolean;
	cameraLandscape?: boolean;
	cameraFlash?: keyof typeof RNCamera.Constants.FlashMode;
	onPictureTaken: (response: TakePictureResponse) => void;
}
interface BarcodeProps {
	explanation: string;
	onBarcodeScanned: (content: string, type: BarcodeType) => void;
}
interface FaceProps {
	explanation: string;
	onFacesDetected: (response: Face[]) => void;
}
export type DidiCameraProps = CommonProps &
	(
		| (PictureProps & Partial<BarcodeProps & FaceProps>)
		| (BarcodeProps & Partial<PictureProps & FaceProps>)
		| (FaceProps & Partial<PictureProps & BarcodeProps>)
	);

// Keep last aspect ratio globally, since it won't change between instances
let defaultAspectRatio: { width: number; height: number } = { width: 4, height: 3 };

interface DidiCameraState {
	cameraAvailable: boolean;
	ratio: { width: number; height: number };
}

export class DidiCamera extends React.Component<DidiCameraProps, DidiCameraState> {
	constructor(props: DidiCameraProps) {
		super(props);
		this.state = {
			cameraAvailable: false,
			ratio: defaultAspectRatio
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
				<View style={styles.cameraContainer}>{this.renderCamera()}</View>
				<View style={styles.cameraButtonContainer}>{this.renderPictureButton()}</View>
			</Fragment>
		);
	}

	private renderCamera() {
		const onCameraLayout = this.props.onCameraLayout;
		const onFacesDetected = this.props.onFacesDetected;
		return (
			<RNCamera
				onLayout={onCameraLayout && (event => onCameraLayout(event.nativeEvent.layout))}
				ratio={`${this.state.ratio.width}:${this.state.ratio.height}`}
				style={[styles.preview, { aspectRatio: this.state.ratio.height / this.state.ratio.width }]}
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
				{...(onFacesDetected
					? {
							faceDetectionClassifications: RNCamera.Constants.FaceDetection.Classifications.all,
							faceDetectionMode: RNCamera.Constants.FaceDetection.Mode.fast,
							faceDetectionLandmarks: RNCamera.Constants.FaceDetection.Landmarks.all,
							onFacesDetected: res => onFacesDetected(res.faces)
					  }
					: undefined)}
				onBarCodeRead={this.props.onBarcodeScanned ? event => this.onBarCodeRead(event) : undefined}
				notAuthorizedView={
					<DidiText.CameraExplanation style={styles.notAuthorized}>
						{strings.camera.notAuthorized}
					</DidiText.CameraExplanation>
				}
				onCameraReady={() => this.onCameraReady()}
			>
				{this.state.cameraAvailable && this.props.children}
			</RNCamera>
		);
	}

	private async onCameraReady() {
		const aspectRatios = await this.camera!.getSupportedRatiosAsync();
		const aspectRatio =
			aspectRatios.length === 0
				? "4:3" // Default, should always exist
				: aspectRatios[aspectRatios.length - 1];
		const [width, height] = aspectRatio.split(":").map(Number);

		defaultAspectRatio = { width, height };
		this.setState({ cameraAvailable: true, ratio: { width, height } });
	}

	private renderPictureButton() {
		if (!this.state.cameraAvailable) {
			return null;
		}

		if (this.props.onPictureTaken) {
			return DidiCamera.cameraButton(() => this.takePicture(), this.props.cameraButtonDisabled);
		} else {
			return (
				<DidiText.CameraExplanation style={styles.cameraInstruction}>
					{this.props.explanation}
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

	async takePicture(args?: { pauseAfterCapture?: boolean }) {
		if (this.camera === null) {
			throw new Error("Camera not available");
		}

		const data = await this.camera.takePictureAsync({
			quality: 0.5,
			base64: false,
			pauseAfterCapture: args?.pauseAfterCapture ?? true,
			orientation: this.props.cameraLandscape ? "landscapeLeft" : "portrait",
			mirrorImage: false,
			fixOrientation: true
		});
		this.props.onPictureTaken?.(data);
		return data;
	}
}

const styles = StyleSheet.create({
	cameraContainer: {
		flex: 1,
		flexDirection: "row",
		backgroundColor: "black",
		justifyContent: "center"
	},
	preview: {
		maxWidth: "100%",
		maxHeight: "100%"
	},
	notAuthorized: {
		textAlignVertical: "center",
		flex: 1
	},
	cameraButtonContainer: {
		...StyleSheet.absoluteFillObject,
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

export const cameraButtonStyle = styles.cameraButton;
