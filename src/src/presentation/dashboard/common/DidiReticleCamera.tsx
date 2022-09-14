import ImageEditor, { ImageCropData } from "@react-native-community/image-editor";
import React, { Fragment } from "react";
import { LayoutRectangle, StyleProp, View, ViewStyle } from "react-native";
import { TakePictureResponse } from "react-native-camera";

import colors from "../../resources/colors";

export interface DidiReticleCameraProps {
	photoWidth: number;
	photoHeight: number;
	targetWidth: number;
	targetHeight: number;

	reticleShape?: "rectangle" | "circle";

	camera: (
		onLayout: (layout: LayoutRectangle) => void,
		reticle: JSX.Element | undefined,
		onPictureTaken: (data: TakePictureResponse) => Promise<void>,
		reticleBounds?: LayoutRectangle
	) => JSX.Element;
	cameraLandscape: boolean;
	onPictureCropped: (picture: { uri: string }) => void;
}

interface DidiReticleCameraState {
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

function toViewStyle(rect: LayoutRectangle) {
	return {
		width: rect.width,
		height: rect.height,
		top: rect.y,
		left: rect.x,
		position: "absolute" as const
	};
}

export class DidiReticleCamera extends React.Component<DidiReticleCameraProps, DidiReticleCameraState> {
	constructor(props: DidiReticleCameraProps) {
		super(props);
		this.state = {};
	}

	render() {
		return this.props.camera(
			layout => this.setState({ layout }),
			this.state.layout && (
				<Fragment>
					<View style={this.photoStyle(this.state.layout)} />
					<View style={this.targetStyle(this.state.layout)} />
				</Fragment>
			),
			(data: TakePictureResponse) => this.onPictureTaken(data),
			this.state.layout && this.screenPhotoRect(this.state.layout)
		);
	}

	private screenPhotoRect(screen: LayoutRectangle) {
		const ratio = fitRatio(this.photoRect(), screen);
		return center(scale(this.photoRect(), ratio), screen);
	}

	private photoStyle(screen: LayoutRectangle): StyleProp<ViewStyle> {
		const main = toViewStyle(this.screenPhotoRect(screen));
		const borderRadius = this.props.reticleShape === "circle" ? Math.min(main.width, main.height) : 0;
		return { ...main, borderRadius, borderColor: colors.secondary, borderWidth: 2 };
	}

	private targetStyle(screen: LayoutRectangle): StyleProp<ViewStyle> {
		const ratio = fitRatio(this.photoRect(), screen);
		const main = toViewStyle(center(scale(this.targetRect(), ratio), screen));
		const borderRadius = this.props.reticleShape === "circle" ? Math.min(main.width, main.height) : 0;
		return { ...main, borderRadius, borderColor: colors.primary, borderWidth: 5 };
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
		this.props.onPictureCropped({ uri: croppedUri });
	}
}
