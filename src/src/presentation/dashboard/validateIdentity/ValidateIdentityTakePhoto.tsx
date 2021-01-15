import React from "react";
import { BackHandler, Image, NativeEventSubscription, TouchableOpacity, View, ScrollView } from "react-native";

import commonStyles from "../../resources/commonStyles";
import { DidiText } from "../../util/DidiText";
import { cameraButtonStyle } from "../common/DidiCamera";
import { DidiReticleCamera, DidiReticleCameraProps } from "../common/DidiReticleCamera";
import colors from "../../resources/colors";
import Checkmark from "../../resources/images/cameraCheckmark.svg";

import ValidateIdentityExplanation, { ValidateIdentityExplanationProps } from "./ValidateIdentityExplanation";
import { ValidateIdentityExplanationHeader } from "./ValidateIdentityExplanationHeader";

export type ValidateIdentityTakePhotoProps = {
	confirmation: string;
	onPictureAccepted: (response: { uri: string }, reset: () => void) => void;
} & Omit<DidiReticleCameraProps, "onPictureCropped"> &
	Omit<ValidateIdentityExplanationProps, "buttonText" | "buttonAction">;

export type ValidateIdentityTakePhotoState =
	| { state: "explanation" | "camera" }
	| { state: "confirmation"; uri: string };

export class ValidateIdentityTakePhoto extends React.Component<
	ValidateIdentityTakePhotoProps,
	ValidateIdentityTakePhotoState
> {
	private backHandler?: NativeEventSubscription;

	constructor(props: ValidateIdentityTakePhotoProps) {
		super(props);
		this.state = {
			state: "explanation"
		};
	}

	componentDidMount() {
		this.backHandler = BackHandler.addEventListener("hardwareBackPress", (): boolean => {
			switch (this.state.state) {
				case "explanation":
					return false;
				case "camera":
					this.setState({ state: "explanation" });
					return true;
				case "confirmation":
					this.setState({ state: "camera" });
					return true;
			}
		});
	}

	componentWillUnmount() {
		if (this.backHandler) {
			this.backHandler.remove();
		}
	}

	render(): JSX.Element {
		switch (this.state.state) {
			case "explanation":
				return (
					<ValidateIdentityExplanation
						header={this.props.header}
						description={this.props.description}
						image={this.props.image}
						buttonAction={() => this.setState({ state: "camera" })}
					/>
				);
			case "camera":
				return <DidiReticleCamera {...this.props} onPictureCropped={pic => this.onPictureTaken(pic)} />;
			case "confirmation":
				const uri = this.state.uri;
				return (
					<ScrollView style={{ flexGrow: 1, backgroundColor: colors.background }}>
						<View style={commonStyles.view.area}>
							<View style={commonStyles.view.body}>
								<ValidateIdentityExplanationHeader {...this.props.header} />
								<DidiText.ValidateIdentity.Normal>{this.props.confirmation}</DidiText.ValidateIdentity.Normal>
								<Image
									style={{
										resizeMode: "contain",
										aspectRatio: this.props.photoWidth / this.props.photoHeight,
										maxWidth: "100%"
									}}
									source={{ uri: this.state.uri }}
								/>
								<TouchableOpacity style={cameraButtonStyle} onPress={() => this.onPictureAccepted(uri)}>
									<Checkmark width="100%" height="100%" />
								</TouchableOpacity>
							</View>
						</View>
					</ScrollView>
				);
		}
	}

	private async onPictureTaken(data: { uri: string }) {
		this.setState({ state: "confirmation", uri: data.uri });
	}

	private onPictureAccepted(uri: string) {
		this.props.onPictureAccepted({ uri }, () => {
			this.setState({ state: "explanation" });
		});
	}
}
