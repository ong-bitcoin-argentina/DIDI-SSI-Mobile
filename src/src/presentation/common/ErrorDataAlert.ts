import { ErrorData } from "@proyecto-didi/app-sdk";
import { Alert } from "react-native";

export const ErrorDataAlert = {
	alert: (error: ErrorData, onClose?: () => void) => {
		Alert.alert("Error", error.message, [{ text: "OK", onPress: onClose }], {
			onDismiss: onClose
		});
	}
};
