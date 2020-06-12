import { Alert } from "react-native";

export const DataAlert = {
	alert: (title: string, message: string, onClose?: () => void) => {
		Alert.alert(title, message, [{ text: "OK", onPress: onClose }], {
			onDismiss: onClose
		});
	}
};
