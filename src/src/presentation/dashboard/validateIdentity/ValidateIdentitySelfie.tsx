import React from "react";
import { LayoutRectangle, Vibration, View } from "react-native";
import { Face, TakePictureResponse } from "react-native-camera";

import { assertUnreachable } from "../../../util/assertUnreachable";
import NavigationHeaderStyle from "../../common/NavigationHeaderStyle";
import NavigationEnabledComponent from "../../util/NavigationEnabledComponent";
import { DidiCamera } from "../common/DidiCamera";

import { DocumentBarcodeData } from "../../../model/DocumentBarcodeData";
import strings from "../../resources/strings";

import { LivenessChecker } from "./LivenessChecker";
import { LivenessGesture } from "./LivenessGesture";
import { ValidateIdentitySubmitProps } from "./ValidateIdentitySubmit";
import { ValidateIdentityTakePhoto } from "./ValidateIdentityTakePhoto";

export interface ValidateIdentitySelfieNavigation {
	ValidateIdentitySubmit: ValidateIdentitySubmitProps;
}
export interface ValidateIdentitySelfieProps {
	documentData: DocumentBarcodeData;
	front: { uri: string };
	back: { uri: string };
}

interface ValidateIdentitySelfieState {
	gesture: LivenessGesture;
}

export class ValidateIdentitySelfieScreen extends NavigationEnabledComponent<
	ValidateIdentitySelfieProps,
	ValidateIdentitySelfieState,
	ValidateIdentitySelfieNavigation
> {
	static navigationOptions = NavigationHeaderStyle.withTitle(strings.validateIdentity.header);

	constructor(props: ValidateIdentitySelfieProps) {
		super(props);

		function getRandom<A>(array: [A, ...A[]]): A {
			return array[Math.floor(Math.random() * array.length)];
		}
		this.state = {
			gesture: getRandom(LivenessChecker.supportedGestures)
		};
	}

	render() {
		return (
			<ValidateIdentityTakePhoto
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
						"ValidateIdentitySubmit",
						{
							...this.props,
							selfie: data
						},
						reset
					);
				}}
			/>
		);
	}
}

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
	private camera: DidiCamera | null = null;

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
				<DidiCamera
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
				</DidiCamera>
			</View>
		);
	}

	componentDidUpdate(prevProps: SelfieCameraProps, prevState: SelfieCameraState) {
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
					// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
					this.props.onPictureTaken(this.state.rawPicture!);
				}
				return;

			default:
				assertUnreachable(this.state);
		}
	}
}
