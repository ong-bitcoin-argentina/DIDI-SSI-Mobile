import ImageEditor, { ImageCropData } from "@react-native-community/image-editor";
import React, { Fragment } from "react";
import {
	BackHandler,
	Image,
	LayoutRectangle,
	NativeEventSubscription,
	StyleProp,
	TouchableOpacity,
	View,
	ViewStyle
} from "react-native";
import { TakePictureResponse } from "react-native-camera/types";

import commonStyles from "../../resources/commonStyles";
import { DidiText } from "../../util/DidiText";
import { cameraButtonStyle, DidiCamera, DidiCameraProps } from "../common/DidiCamera";

import colors from "../../resources/colors";
import Checkmark from "../../resources/images/cameraCheckmark.svg";

import ValidateIdentityExplanation, { ValidateIdentityExplanationProps } from "./ValidateIdentityExplanation";
import { ValidateIdentityExplanationHeader } from "./ValidateIdentityExplanationHeader";

export type ValidateIdentityTakePhotoProps = {
	photoWidth: number;
	photoHeight: number;
	targetWidth: number;
	targetHeight: number;
	onPictureTaken: (response: { uri: string }, reset: () => void) => void;
	confirmation: string;
} & Pick<DidiCameraProps, "cameraLandscape" | "onBarcodeScanned" | "cameraLocation" | "cameraButtonDisabled"> &
	Pick<ValidateIdentityExplanationProps, "header" | "description" | "image">;

export type ValidateIdentityTakePhotoState =
	| { state: "explanation" }
	| { state: "camera"; layout?: LayoutRectangle }
	| { state: "confirmation"; uri: string };

function transpose(layout: LayoutRectangle): LayoutRectangle {
	return {
		height: layout.width,
		width: layout.height,
		x: layout.y,
		y: layout.x
	};
}

function scale(rect: LayoutRectangle, ratio: number): LayoutRectangle {
	return {
		height: rect.height * ratio,
		width: rect.width * ratio,
		x: rect.x * ratio,
		y: rect.y * ratio
	};
}

function center(rect: LayoutRectangle, to: LayoutRectangle): LayoutRectangle {
	return {
		height: rect.height,
		width: rect.width,
		x: to.x + to.width / 2 - rect.width / 2,
		y: to.y + to.height / 2 - rect.height / 2
	};
}

function fitRatio(rect: LayoutRectangle, into: LayoutRectangle): number {
	const widthRatio = into.width / rect.width;
	const heightRatio = into.height / rect.height;

	return Math.min(widthRatio, heightRatio);
}

function toViewStyle(rect: LayoutRectangle): ViewStyle {
	return {
		width: rect.width,
		height: rect.height,
		top: rect.y,
		left: rect.x,
		position: "absolute"
	};
}

export abstract class ValidateIdentityTakePhoto extends React.Component<
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
				return (
					<View style={{ flex: 1 }}>
						<DidiCamera
							{...this.props}
							onCameraLayout={rect => this.setState({ state: "camera", layout: rect })}
							onPictureTaken={data => this.onPictureTaken(data)}
						>
							{this.state.layout && (
								<Fragment>
									<View style={this.photoStyle(this.state.layout)} />
									<View style={this.targetStyle(this.state.layout)} />
								</Fragment>
							)}
						</DidiCamera>
					</View>
				);
			case "confirmation":
				const uri = this.state.uri;
				return (
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
				);
		}
	}

	private photoStyle(screen: LayoutRectangle): StyleProp<ViewStyle> {
		const ratio = fitRatio(this.photoRect(), screen);
		return [
			toViewStyle(center(scale(this.photoRect(), ratio), screen)),
			{ borderColor: colors.secondary, borderWidth: 2 }
		];
	}

	private targetStyle(screen: LayoutRectangle): StyleProp<ViewStyle> {
		const ratio = fitRatio(this.photoRect(), screen);
		return [
			toViewStyle(center(scale(this.targetRect(), ratio), screen)),
			{ borderColor: colors.primary, borderWidth: 5 }
		];
	}

	private transposeIfNeeded(rect: LayoutRectangle): LayoutRectangle {
		if (this.props.cameraLandscape) {
			return transpose(rect);
		} else {
			return rect;
		}
	}

	private photoRect(): LayoutRectangle {
		return this.transposeIfNeeded({
			x: 0,
			y: 0,
			width: this.props.photoWidth,
			height: this.props.photoHeight
		});
	}

	private targetRect(): LayoutRectangle {
		return this.transposeIfNeeded({
			x: 0,
			y: 0,
			width: this.props.targetWidth,
			height: this.props.targetHeight
		});
	}

	private async onPictureTaken(data: TakePictureResponse) {
		const photoRect = this.transposeIfNeeded(this.photoRect());
		const dataRect = {
			x: 0,
			y: 0,
			width: data.width,
			height: data.height
		};

		const ratio = fitRatio(photoRect, dataRect);
		const cropRect = center(scale(photoRect, ratio), dataRect);

		const crop: ImageCropData = {
			offset: cropRect,
			size: cropRect,
			displaySize: photoRect
		};
		const croppedUri = await ImageEditor.cropImage(data.uri, crop);
		this.setState({ state: "confirmation", uri: croppedUri });
	}

	private onPictureAccepted(uri: string) {
		this.props.onPictureTaken({ uri }, () => {
			this.setState({ state: "explanation" });
		});
	}
}
