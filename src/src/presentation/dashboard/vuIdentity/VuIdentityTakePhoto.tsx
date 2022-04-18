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
import strings from "../../resources/strings";
import { getInformation } from '../../../services/vuSecurity/getInformation';
import { ActiveDid } from '../../../store/reducers/didReducer';
import { IReturnGetInformation } from '../../../model/VuGetInformation';

export type VuTakePhotoProps = {
	getVuSecuritydata: boolean;
	image: string;
	confirmation: string;
	onPictureAccepted: (response: { uri: string ,documentData?: IReturnGetInformation}, reset: () => void) => void;
} & Omit<DidiReticleCameraProps, "onPictureCropped"> &
	Omit<VuIdentityExplanationProps, "buttonText" | "buttonAction">;

interface VuSecurityProps {
	operationId: string;
	userName: string;
	did: ActiveDid;
	vuResponseFront?: string;
	vuResponseBack?: string;
}
export type VuIdentityTakePhotoState = 
{ state: "explanation" | "camera", documentData?: IReturnGetInformation } |
{ state: "confirmation"; uri: string, documentData?:IReturnGetInformation };

type VuIdentityTakePhotoProps = VuTakePhotoProps & VuSecurityProps;
class VuIdentityTakePhoto extends React.Component<VuIdentityTakePhotoProps, VuIdentityTakePhotoState> {
	private backHandler?: NativeEventSubscription;

	constructor(props: VuIdentityTakePhotoProps) {
		super(props);
		this.state = {
			state: "explanation",
		};
	}

	async componentDidMount() {
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

		if (this.props.getVuSecuritydata) {
			const documentData =await getInformation(this.props.userName, this.props.operationId, this.props.did);
			this.setState({documentData})
		}		
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
				let uriResponse=""; 
				let cameraResponse="";	
				if(this.props.vuResponseFront === strings.vuIdentity.explainFront.vuResponseFront.confirmation ||
					this.props.vuResponseBack === strings.vuIdentity.explainBack.vuResponseBack.confirmation) {
					uriResponse = this.state.uri;
					cameraResponse = this.props.confirmation;
				}
				if (this.props.vuResponseFront === strings.vuIdentity.explainFront.vuResponseFront.notConfirmed ||
					this.props.vuResponseBack === strings.vuIdentity.explainBack.vuResponseBack.notConfirmed) {
					uriResponse = "goBack";
					cameraResponse = strings.vuIdentity.explainFront.rejected;
				}
				return (
					<ScrollView style={styles.scrollView}>
							<View style={commonStyles.view.area}>
								<View style={commonStyles.view.body}>
									<VuIdentityExplanationHeader {...this.props.header} />
									{this.props.vuResponseFront === strings.vuIdentity.explainFront.vuResponseFront.notConfirmed ?
									<Image style={styles.image} source={this.props.image} />: null}
									<DidiText.ValidateIdentity.Normal>{cameraResponse}</DidiText.ValidateIdentity.Normal>
									<Image
										style={{
											resizeMode: "contain",
											aspectRatio: this.props.photoWidth / this.props.photoHeight,
											maxWidth: "100%"
										}}
										source={{ uri: this.state.uri }}
									/>
									<TouchableOpacity style={cameraButtonStyle} onPress={() => this.onPictureAccepted(uriResponse, this.state.documentData!)}>
									{this.props.vuResponseFront === strings.vuIdentity.explainFront.vuResponseFront.notConfirmed||
									this.props.vuResponseBack === strings.vuIdentity.explainBack.vuResponseBack.notConfirmed?
									<Cross width="100%" height="100%" />:<Checkmark width="100%" height="100%" />}
									</TouchableOpacity>
								</View>
							</View>
					</ScrollView>
				);
			}
		}
	}

	private async onPictureTaken(data: { uri: string }) {
		this.setState({ state: "confirmation", uri: data.uri });
	}

	private onPictureAccepted(uri: string , documentData: any) {
		this.props.onPictureAccepted({ uri , documentData}, () => {
			this.setState({ state: "explanation" });
		});
	}
}
const connected = didiConnect(
	VuIdentityTakePhoto,
	(state): VuSecurityProps => ({
		userName: state.vuSecurityData.userName, 
		operationId: state.vuSecurityData.operationId, 
		did: state.did.activeDid,
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
