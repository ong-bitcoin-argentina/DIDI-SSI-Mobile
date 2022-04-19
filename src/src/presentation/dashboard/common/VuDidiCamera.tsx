import React, { Fragment } from "react";
import { Alert, GestureResponderEvent, LayoutRectangle, StyleSheet, TouchableOpacity, View , ActivityIndicator} from "react-native";
import { Face, RNCamera, RNCameraProps, TakePictureResponse } from "react-native-camera";
import { DidiText } from "../../util/DidiText";
import colors from "../../resources/colors";
import strings from "../../resources/strings";
import themes from "../../resources/themes";
import {addDocumentImage} from "../../../services/vuSecurity/addDocumentImage";
import { didiConnect } from "../../../store/store";
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
	onFacesDetected: (response: Face[]) => void;
}
interface VuSecurityProps {
	VuFront?: boolean;
	VuBack?: boolean;
	operationId: string;
	userName: string;
	did: ActiveDid;
}
interface VuCameraDispatchProps {
	vuSecurityDataFront: (operationId: string, userName: string, vuResponseFront: string) => void;
	vuSecurityDataBack: (operationId: string, userName: string, vuResponseBack: string) => void;
}

export type VuDidiCameraProps = VuCameraDispatchProps & VuSecurityProps & CommonProps &
	(
		| (PictureProps & Partial<BarcodeProps & FaceProps>)
		| (BarcodeProps & Partial<PictureProps & FaceProps>)
		| (FaceProps & Partial<PictureProps & BarcodeProps>)
	);

// Keep last aspect ratio globally, since it won't change between instances
let defaultAspectRatio: { width: number; height: number } = { width: 4, height: 3 };

interface VuDidiCameraState {
	ratio: { width: number; height: number };
	loading: boolean;
}

class VuDidiCamera extends React.Component<VuDidiCameraProps, VuDidiCameraState> {
	constructor(props: VuDidiCameraProps) {
		super(props);
		this.state = {
			ratio: defaultAspectRatio,
			loading: false
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

		const resultDisabled = this.props.cameraButtonDisabled as {title: string, text: string} ;
		if (resultDisabled) {
			return VuDidiCamera.cameraButton(() => Alert.alert(resultDisabled.title, resultDisabled.text));
		}
			return <>{this.state.loading?null:VuDidiCamera.cameraButton(() => this.takePicture())}</>
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
			width: 2000,
			quality: 0.5,
			base64: this.props.cameraOutputsBase64Picture ?? false,
			pauseAfterCapture: args?.pauseAfterCapture ?? true,
			orientation: this.props.cameraLandscape ? "landscapeLeft" : "portrait",
			mirrorImage: false,
			fixOrientation: true
		});	
		if (this.props.VuFront) {
			this.setState({loading:true});
			const result = await addDocumentImage(this.props.userName,this.props.operationId,data.base64 as string ,this.props.did,"front");
			this.props.vuSecurityDataFront(this.props.operationId, this.props.userName,result.status);
		}

		if (this.props.VuBack) {
			this.setState({loading:true});
			const result = await addDocumentImage(this.props.userName,this.props.operationId,data.base64 as string ,this.props.did,"back");	
			this.props.vuSecurityDataBack(this.props.operationId, this.props.userName,result.status);
		}
		this.props.onPictureTaken?.(data);
		return data;
	}

	private renderCamera(types?: "front" | "back" | undefined) {
		const onCameraLayout = this.props.onCameraLayout;
		if (this.props.explanation === "Escaneá un código QR") types = "back";
		if (this.props.cameraLandscape) types = "back";
		if (!this.props.cameraLandscape) types = "front";

		return (
			<>
			{this.state.loading? <ActivityIndicator size="large" color='#5E49E2'/>:
			<RNCamera
				onLayout={onCameraLayout && (event => onCameraLayout(event.nativeEvent.layout))}
				ratio={`${this.state.ratio.width}:${this.state.ratio.height}`}
				style={[styles.preview, { aspectRatio: this.state.ratio.height / this.state.ratio.width }]}
				ref={ref => (this.camera = ref)}
				captureAudio={false}
				type={RNCamera.Constants.Type[types || "back"]}
				flashMode={RNCamera.Constants.FlashMode[this.props.cameraFlash || "auto"]}
				androidCameraPermissionOptions={{
					title: "Permiso para acceder a la camara",
					message: "Didi necesita poder capturar imagenes de documentos",
					buttonPositive: "Ok",
					buttonNegative: "Cancelar"
				}}
				onBarCodeRead={this.props.onBarcodeScanned ? (event): void => {
					return this.onBarCodeRead(event);
				} : undefined}
				notAuthorizedView={
					<DidiText.CameraExplanation style={styles.notAuthorized}>
						{strings.camera.notAuthorized}
					</DidiText.CameraExplanation>
				}
				onCameraReady={() => this.onCameraReady()}
			>
				{this.props.children}
			</RNCamera>
			}
			</>
		);
	}

	render() {
		return (
			<Fragment>
				<View style={styles.cameraContainer}>{this.renderCamera("back")}</View>
				<View style={styles.cameraButtonContainer}>{this.renderPictureButton()}</View>
			</Fragment>
		);
	}
}

const connected = didiConnect(
	VuDidiCamera,
	(state): VuSecurityProps => ({
		operationId: state.vuSecurityData.operationId,
		userName: state.vuSecurityData.userName,
		did: state.did.activeDid
	}),
	(dispatch): VuCameraDispatchProps => ({
		vuSecurityDataFront: (operationId: string, userName: string, vuResponseFront: string) =>{
			dispatch({ type: "VU_SECURITY_RESPONSE_ADD_FRONT", state: { operationId, userName, vuResponseFront } })
		},
		vuSecurityDataBack: (operationId: string, userName: string, vuResponseBack: string) =>{
			dispatch({ type: "VU_SECURITY_RESPONSE_ADD_BACK", state: { operationId, userName, vuResponseBack } })
		}
	})
);

export { connected as VuDidiCamera };

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
