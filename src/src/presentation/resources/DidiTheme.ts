import { Color } from "./colors";

export default interface DidiTheme {
	background: Color;
	foreground: Color;
	foregroundFaded: Color;

	header: Color;
	navigation: Color;
	darkNavigation: Color;
	navigationText: Color;

	button: Color;
	buttonText: Color;

	buttonDisabled: Color;
	buttonDisabledText: Color;

	headerText: Color;
	navigationIconActive: Color;
	navigationIconInactive: Color;
}
