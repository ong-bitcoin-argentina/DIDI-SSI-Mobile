import React from "react";
import {
	BackHandler,
	Image,
	NativeEventSubscription,
	TouchableOpacity,
	View,
	ScrollView,
	StyleSheet
} from "react-native";

import commonStyles from "../../resources/commonStyles";
import { DidiText } from "../../util/DidiText";
import { cameraButtonStyle } from "../common/DidiCamera";
import { DidiReticleCamera, DidiReticleCameraProps } from "../common/DidiReticleCamera";
import colors from "../../resources/colors";
import Checkmark from "../../resources/images/cameraCheckmark.svg";
import Cross from "../../resources/images/cross.svg";

import { VuIdentityExplanationHeader } from "./VuIdentityExplanationHeader";
import { didiConnect } from "../../../store/store";
import VuIdentityExplanation, { VuIdentityExplanationProps } from './VuIdentityExplanation';

export type VuTakePhotoProps = {
	image: string;
	confirmation: string;
	onPictureAccepted: (response: { uri: string }, reset: () => void) => void;
} & Omit<DidiReticleCameraProps, "onPictureCropped"> &
	Omit<VuIdentityExplanationProps, "buttonText" | "buttonAction">;

interface VuSecurityProps {
	vuResponseFront?: string;
	vuResponseBack?: string;
}
export type VuIdentityTakePhotoState = { state: "explanation" | "camera" } | { state: "confirmation"; uri: string };

type VuIdentityTakePhotoProps = VuTakePhotoProps & VuSecurityProps;
class VuIdentityTakePhoto extends React.Component<VuIdentityTakePhotoProps, VuIdentityTakePhotoState> {
	private backHandler?: NativeEventSubscription;

	constructor(props: VuIdentityTakePhotoProps) {
		super(props);
		this.state = {
			state: "explanation"
		};
	}

	componentDidMount() {
		this.backHandler = BackHandler.addEventListener("hardwareBackPress", (): boolean => {
			console.log(this.state.state);

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
					<VuIdentityExplanation
						header={this.props.header}
						description={this.props.description}
						image={this.props.image}
						buttonAction={() => this.setState({ state: "camera" })}
					/>
				);
			case "camera":
				return <DidiReticleCamera {...this.props} onPictureCropped={pic => this.onPictureTaken(pic)} />;
			case "confirmation": {
				const uri = this.state.uri;
				return (
					<ScrollView style={styles.scrollView}>
						{this.props.vuResponseFront === "Add front success" ? (
							<View style={commonStyles.view.area}>
								<View style={commonStyles.view.body}>
									<VuIdentityExplanationHeader {...this.props.header} />
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
						) : (
							<View style={commonStyles.view.area}>
								<View style={commonStyles.view.body}>
									<VuIdentityExplanationHeader {...this.props.header} />
									<Image style={styles.image} source={this.props.image} />
									<DidiText.ValidateIdentity.Normal>
										la foto fue rechazada por favor verifique que los margen del carnet coincida, con lo que le indica
										la cámara
									</DidiText.ValidateIdentity.Normal>

									<Image
										style={{
											resizeMode: "contain",
											aspectRatio: this.props.photoWidth / this.props.photoHeight,
											maxWidth: "100%"
										}}
										source={{ uri: this.state.uri }}
									/>
									<TouchableOpacity style={cameraButtonStyle} onPress={() => this.onPictureAccepted('goBack')}>
										<Cross width="100%" height="100%" />
									</TouchableOpacity>
								</View>
							</View>
						)}
					</ScrollView>
				);
			}
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

const connected = didiConnect(
	VuIdentityTakePhoto,
	(state): VuSecurityProps => ({
		vuResponseFront: state.vuSecurityData.vuResponseFront,
		vuResponseBack: state.vuSecurityData.vuResponseBack
	})
);

export { connected as VuIdentityTakePhoto };

const styles = StyleSheet.create({
	scrollView: {
		flexGrow: 1,
		backgroundColor: colors.background
	},
	image: {
		alignSelf: "center",
		width: 166,
		height: 144
	}
});
