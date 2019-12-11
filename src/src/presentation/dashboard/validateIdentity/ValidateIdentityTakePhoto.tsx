import ImageEditor, { ImageCropData } from "@react-native-community/image-editor";
import React, { Fragment } from "react";
import { Alert, BackHandler, LayoutRectangle, NativeEventSubscription, StyleProp, View, ViewStyle } from "react-native";
import { TakePictureResponse } from "react-native-camera/types";

import { DidiCamera, DidiCameraProps } from "../common/DidiCamera";

import colors from "../../resources/colors";

export type ValidateIdentityTakePhotoProps = Omit<DidiCameraProps, "onPictureTaken"> & {
	photoWidth: number;
	photoHeight: number;
	targetWidth: number;
	targetHeight: number;
	onPictureTaken: (response: { uri: string }) => void;
	explanation: (startCamera: () => void) => JSX.Element;
};

export interface ValidateIdentityTakePhotoState {
	isScanning: boolean;
	layout?: LayoutRectangle;
}

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
			isScanning: false
		};
	}

	componentDidMount() {
		this.backHandler = BackHandler.addEventListener("hardwareBackPress", () => {
			if (this.state.isScanning) {
				this.setState({ isScanning: false });
				return true;
			} else {
				return false;
			}
		});
	}

	componentWillUnmount() {
		if (this.backHandler) {
			this.backHandler.remove();
		}
	}

	render() {
		if (this.state.isScanning) {
			return (
				<View style={{ flex: 1 }}>
					<DidiCamera
						{...this.props}
						onCameraLayout={rect => {
							if (this.props.onCameraLayout) {
								this.props.onCameraLayout(rect);
							}
							this.setState({ layout: rect });
						}}
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
		} else {
			return this.props.explanation(() => this.setState({ isScanning: true }));
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
		this.setState({ isScanning: false });
		if (!this.props.onPictureTaken) {
			return;
		}

		const photoRect = transpose(this.photoRect());
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
		this.props.onPictureTaken({ uri: croppedUri });
	}
}
