import React from "react";
import { BackHandler, NativeEventSubscription } from "react-native";
import { TakePictureResponse } from "react-native-camera/types";

import NavigationEnabledComponent from "../../util/NavigationEnabledComponent";
import DidiCamera from "../common/DidiCamera";

import NavigationHeaderStyle from "../../resources/NavigationHeaderStyle";
import strings from "../../resources/strings";

import ValidateIdentityExplanation, { ValidateIdentityExplanationProps } from "./ValidateIdentityExplanation";

export type ValidateIdentityTakePhotoProps = {};

export interface ValidateIdentityTakePhotoState {
	isScanning: boolean;
}

export abstract class ValidateIdentityTakePhotoScreen<
	Props extends ValidateIdentityTakePhotoProps,
	State extends ValidateIdentityTakePhotoState,
	Nav
> extends NavigationEnabledComponent<Props, State, Nav> {
	static navigationOptions = NavigationHeaderStyle.withTitle(strings.validateIdentity.header);

	protected abstract didTakePhoto(data: TakePictureResponse): void;

	protected abstract explanationProps(): Omit<ValidateIdentityExplanationProps, "buttonAction">;

	private backHandler?: NativeEventSubscription;

	render() {
		if (this.state.isScanning) {
			return <DidiCamera onPictureTaken={data => this.didTakePhoto(data)} />;
		} else {
			return (
				<ValidateIdentityExplanation
					{...this.explanationProps()}
					buttonAction={() => this.setState({ isScanning: true })}
				/>
			);
		}
	}

	componentDidMount() {
		this.backHandler = BackHandler.addEventListener("hardwareBackPress", () => {
			const navigation = this.navigation();
			if (this.state.isScanning && navigation && navigation.isFocused) {
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
}
