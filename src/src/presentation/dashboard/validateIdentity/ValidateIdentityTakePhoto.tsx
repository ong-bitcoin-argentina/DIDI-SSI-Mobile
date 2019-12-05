import React from "react";
import { BackHandler, NativeEventSubscription } from "react-native";
import { TakePictureResponse } from "react-native-camera/types";

import { DidiCamera, DidiCameraProps } from "../common/DidiCamera";

export type ValidateIdentityTakePhotoProps = DidiCameraProps & {
	explanation: (startCamera: () => void) => JSX.Element;
};

export interface ValidateIdentityTakePhotoState {
	isScanning: boolean;
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

	render() {
		if (this.state.isScanning) {
			return <DidiCamera {...this.props} onPictureTaken={data => this.onPictureTaken(data)} />;
		} else {
			return this.props.explanation(() => this.setState({ isScanning: true }));
		}
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

	private onPictureTaken(data: TakePictureResponse) {
		this.setState({ isScanning: false });
		if (this.props.onPictureTaken) {
			this.props.onPictureTaken(data);
		}
	}
}
