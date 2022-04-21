import React from "react";
import { LayoutRectangle, Vibration, View } from "react-native";
import { Face, TakePictureResponse } from "react-native-camera";

import { assertUnreachable } from "../../../util/assertUnreachable";
import NavigationHeaderStyle from "../../common/NavigationHeaderStyle";
import NavigationEnabledComponent from "../../util/NavigationEnabledComponent";

import { DocumentBarcodeData } from "../../../model/DocumentBarcodeData";
import strings from "../../resources/strings";

import { LivenessChecker } from "./LivenessChecker";
import { LivenessGesture } from "./LivenessGesture";
import { VuDidiSelfieCamera } from "../common/VuDidiSelfieCamera";
import { IVuIdentitySubmitScreenProps } from "./VuIdentitySubmitScreen";
import { didiConnect } from "../../../store/store";
import { VuIdentityTakePhoto } from "./VuIdentityTakePhoto";
import { IReturnGetInformation } from "../../../model/VuGetInformation";

export interface VuIdentitySelfieNavigation {
	ValidateIdentitySubmit: IVuIdentitySubmitScreenProps;
}
export interface VuIdentitySelfieProps {
	documentData: DocumentBarcodeData;
	documentDataVU: IReturnGetInformation;
	front: { uri: string };
	back: { uri: string };
	randomNumber: number;
}

interface VuIdentitySelfieState {
	gesture: LivenessGesture;
}

class VuIdentitySelfieScreen extends NavigationEnabledComponent<
	VuIdentitySelfieProps,
	VuIdentitySelfieState,
	VuIdentitySelfieNavigation
> {
	static navigationOptions = NavigationHeaderStyle.withTitle(strings.validateIdentity.header);

	constructor(props: VuIdentitySelfieProps) {
		super(props);		
		this.state = {
			gesture: this.getRandom(LivenessChecker.supportedGestures)
		};
	}
	getRandom<A>(array: [A, ...A[]]): A { return array[this.props.randomNumber % array.length]}
	render() {
		return (
			<VuIdentityTakePhoto
				getVuSecuritydata={true}
				photoWidth={600}
				photoHeight={720}
				targetWidth={600}
				targetHeight={720}
				cameraLandscape={false}
				header={{
					title: strings.validateIdentity.explainSelfie.step,
					header: strings.validateIdentity.explainSelfie.header
				}}
				description={strings.validateIdentity.explainSelfie.description(this.state.gesture)}
				confirmation={strings.validateIdentity.explainSelfie.confirmation}
				image={require("../../resources/images/validateIdentityExplainSelfie.png")}
				camera={(onLayout, reticle, onPictureTaken, reticleBounds) => (
					<SelfieCamera
						onCameraLayout={onLayout}
						gesture={this.state.gesture}
						reticle={reticle}
						onPictureTaken={data => {
							Vibration.vibrate(400, false);
							return onPictureTaken(data);
						}}
						reticleBounds={reticleBounds}
					/>
				)}
				onPictureAccepted={(data, reset) => {
					this.navigate(
						"VuIdentitySubmit",
						{
							...this.props,
							selfie: {
								uri:data.uri,
							},
							documentDataVu: data.documentData
						},
						reset
					);
				}}
			/>
		);
	}
}

const connected = didiConnect(
	VuIdentitySelfieScreen,
	(state): {randomNumber: number} => ({
		randomNumber: parseInt(state.vuSecurityData.operationId),
	})
);

export { connected as VuIdentitySelfieScreen };

interface SelfieCameraProps {
	onCameraLayout: (layout: LayoutRectangle) => void;
	gesture: LivenessGesture;
	reticle: JSX.Element | undefined;
	onPictureTaken: (data: TakePictureResponse) => Promise<void>;
	reticleBounds: LayoutRectangle | undefined;
}

type SelfieCameraState = {
	livenessChecker: LivenessChecker;
} & (
	| { state: "init" }
	| { state: "capture" }
	| { state: "liveness"; rawPicture: TakePictureResponse; instructionIndex: number }
);

class SelfieCamera extends React.Component<SelfieCameraProps, SelfieCameraState> {
	private camera: VuDidiSelfieCamera | null = null;

	constructor(props: SelfieCameraProps) {
		super(props);
		this.state = {
			livenessChecker: LivenessChecker.empty(),
			state: "init"
		};
	}

	render() {
		return (
			<View style={{ flex: 1 }}>
				<VuDidiSelfieCamera
					ref={ref => (this.camera = ref)}
					cameraLocation="front"
					cameraFlash="off"
					cameraLandscape={false}
					onCameraLayout={this.props.onCameraLayout}
					onFacesDetected={faces => this.addFacesToState(faces)}
					explanation={
						this.state.state === "liveness"
							? strings.validateIdentity.explainSelfie.gestureExplanation(this.props.gesture)
							: strings.validateIdentity.explainSelfie.cameraExplanation
					}
				>
					{this.props.reticle}
				</VuDidiSelfieCamera>
			</View>
		);
	}

	componentDidUpdate(_prevProps: SelfieCameraProps, prevState: SelfieCameraState) {
		if (this.state.state !== "capture" && prevState.state !== this.state.state) {
			Vibration.vibrate(400, false);
		}
	}

	private async addFacesToState(faces: Face[]) {
		if (this.camera === null) {
			// Can this even happen?
			return;
		}

		const livenessChecker = this.state.livenessChecker.addFacesToState(faces);
		if (livenessChecker.canPerformGesture(this.props.gesture)) {
			this.setState({ livenessChecker });
		} else {
			this.setState({ state: "init", livenessChecker: LivenessChecker.empty() });
		}

		switch (this.state.state) {
			case "init":
				if (!this.props.reticleBounds || !livenessChecker.canTakePhoto(this.props.reticleBounds)) {
					return;
				}
				this.setState({ state: "capture" });
				try {
					const data = await this.camera.takePicture({ pauseAfterCapture: false });
					this.setState({
						state: "liveness",
						rawPicture: data,
						livenessChecker,
						instructionIndex: livenessChecker.historyLength()
					});
				} catch {
					this.setState({ state: "init" });
				}
				return;

			case "capture":
				return;

			case "liveness":
				if (livenessChecker.didPerformGesture(this.props.gesture, this.state.instructionIndex)) {
					this.props.onPictureTaken(this.state.rawPicture!);
				}
				return;

			default:
				assertUnreachable(this.state);
		}
	}
}
