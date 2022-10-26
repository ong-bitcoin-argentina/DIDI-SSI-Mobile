import React, { Fragment } from "react";
import { GestureResponderEvent, LayoutRectangle, StyleSheet, TouchableOpacity, View } from "react-native";
import { Face, RNCamera, RNCameraProps, TakePictureResponse } from "react-native-camera";
import { DidiText } from "../../util/DidiText";
import colors from "../../resources/colors";
import strings from "../../resources/strings";
import themes from "../../resources/themes";
import { ActiveDid } from '../../../store/reducers/didReducer';

type BarcodeEvent = Parameters<NonNullable<RNCameraProps["onBarCodeRead"]>>[0];
export type BarcodeType = BarcodeEvent["type"];

interface CommonProps {
	onCameraLayout?: (rect: LayoutRectangle) => void;
	cameraLocation?: keyof typeof RNCamera.Constants.Type;
	
}
interface PictureProps {
	cameraButtonDisabled?: boolean | { title: string; text: string };
	cameraLandscape?: boolean;
	cameraFlash?: keyof typeof RNCamera.Constants.FlashMode;
	cameraOutputsBase64Picture?: boolean;
	onPictureTaken: (response: TakePictureResponse) => void;
	
}
interface BarcodeProps {
	explanation: string;
	onBarcodeScanned: (content: string, type: BarcodeType) => void;
}
interface FaceProps {
	explanation: string;
	onFacesDetected: ((response: Face[]) => void | undefined) | undefined
}
interface VuSecurityProps {
	VuFront?: boolean;
	VuBack?: boolean;
	VuSelfie?: boolean;
	operationId: string;
	userName: string;
	did: ActiveDid;
}
interface VuCameraDispatchProps {
	vuSecurityDataFront: (operationId: string, userName: string, vuResponseFront: string) => void;
	vuSecurityDataBack: (operationId: string, userName: string, vuResponseBack: string) => void;
}

export type VuDidiSelfieCameraProps = VuCameraDispatchProps & VuSecurityProps & CommonProps &
	(
		| (PictureProps & Partial<BarcodeProps & FaceProps>)
		| (BarcodeProps & Partial<PictureProps & FaceProps>)
		| (FaceProps & Partial<PictureProps & BarcodeProps>)
	);

// Keep last aspect ratio globally, since it won't change between instances
let defaultAspectRatio: { width: number; height: number } = { width: 4, height: 3 };

interface VuDidiSelfieCameraState {
	ratio: { width: number; height: number };
}

export class VuDidiSelfieCamera extends React.Component<VuDidiSelfieCameraProps, VuDidiSelfieCameraState> {
	constructor(props: VuDidiSelfieCameraProps) {
		super(props);
		this.state = {
			ratio: defaultAspectRatio
		};
	}

	private camera: RNCamera | null = null;

	static cameraButton(onPress: (event: GestureResponderEvent) => void, disabled = false) {
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
	
	private async onCameraReady() {
		if (!this.camera) {
			return;
		}
		const aspectRatios = await this.camera.getSupportedRatiosAsync();
		const aspectRatio =
			aspectRatios.length === 0
				? "4:3" // Default, should always exist
				: aspectRatios[aspectRatios.length - 1];
		const [width, height] = aspectRatio.split(":").map(Number);

		defaultAspectRatio = { width, height };
		this.setState({ ratio: { width, height } });
	}

	private renderPictureButton() {
		if (!this.props.onPictureTaken) {
			return (
				<DidiText.CameraExplanation style={styles.cameraInstruction}>
					{this.props.explanation}
				</DidiText.CameraExplanation>
			);
		}
			return VuDidiSelfieCamera.cameraButton(() => this.takePicture());	
	}


	async takePicture(args?: { pauseAfterCapture?: boolean }) {
		if (this.camera === null) {
			throw new Error("Camera not available");
		}
		const data = await this.camera.takePictureAsync({
			width: 2000,
			quality: 0.5,
			base64: this.props.cameraOutputsBase64Picture ?? false,
			pauseAfterCapture: args?.pauseAfterCapture ?? true,
			orientation: this.props.cameraLandscape ? "landscapeLeft" : "portrait",
			mirrorImage: false,
			fixOrientation: true
		});
		this.props.onPictureTaken?.(data);
		return data;
	}

	private renderCamera() {
		const onCameraLayout = this.props.onCameraLayout;
		return (
			<RNCamera
				onLayout={onCameraLayout && (event => onCameraLayout(event.nativeEvent.layout))}
				ratio={`${this.state.ratio.width}:${this.state.ratio.height}`}
				style={[styles.preview, { aspectRatio: this.state.ratio.height / this.state.ratio.width }]}
				ref={ref => (this.camera = ref)}
				captureAudio={false}
				type={"front"}
				flashMode={RNCamera.Constants.FlashMode[this.props.cameraFlash || "auto"]}
				androidCameraPermissionOptions={{
					title: "Permiso para acceder a la camara",
					message: "Didi necesita poder capturar imagenes de documentos",
					buttonPositive: "Ok",
					buttonNegative: "Cancelar"
				}}
				faceDetectionClassifications = {RNCamera.Constants.FaceDetection.Classifications.all}
				faceDetectionMode= {RNCamera.Constants.FaceDetection.Mode.fast}
				faceDetectionLandmarks={RNCamera.Constants.FaceDetection.Landmarks.all}
				onFacesDetected= {res => this.props.onFacesDetected?this.props.onFacesDetected(res.faces): null}
				notAuthorizedView={
					<DidiText.CameraExplanation style={styles.notAuthorized}>
						{strings.camera.notAuthorized}
					</DidiText.CameraExplanation>
				}
				onCameraReady={() => this.onCameraReady()}
			>
				{this.props.children}
			</RNCamera>
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
