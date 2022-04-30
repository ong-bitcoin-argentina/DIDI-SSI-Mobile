import strings from "../../../resources/strings";

interface InputFieldDescription {
	name: string;
	keyboardType?: "number-pad" | "email-address" | "phone-pad";
}

export interface IPersonalInformation {
	'Apellido(s)': string;
    'Nacionalidad': string;
    'Nombre(s)': string;
    'Numero de Identidad': string;
}

export interface ProfileInputDataStructure<T extends keyof any> {
	name: string;
	order: T[];
	structure: { [K in T]: InputFieldDescription };
}

export const personalDataStructure: ProfileInputDataStructure<keyof IPersonalInformation | "cellPhone" | "email"> = {
	name: strings.userData.personalDataLabel,
	order: ["Nombre(s)", "Apellido(s)", "cellPhone", "email", "Numero de Identidad", "Nacionalidad"],
	structure: {
		cellPhone: {
			name: strings.userData.editProfile.cellMessage,
			keyboardType: "phone-pad"
		},
		"Numero de Identidad": {
			name: strings.userData.editProfile.documentMessage,
			keyboardType: "number-pad"
		},
		email: {
			name: strings.userData.editProfile.emailMessage,
			keyboardType: "email-address"
		},
		"Nombre(s)": {
			name: "Nombre(s)"
		},
		"Apellido(s)": {
			name: strings.userData.editProfile.lastNameMessage
		},
		Nacionalidad: {
			name: strings.userData.editProfile.nationalityMessage
		}
	}
};


export interface LegalAddressUser {
	'Ciudad/Barrio': string;
	'Departamento/Municipalidad': string;
	Domicilio: string;
	País: string;
	Provincia: string;
}

export const addressDataStructure: ProfileInputDataStructure<keyof LegalAddressUser> = {
	name: strings.userData.addressDataLabel,
	order: [ "País","Provincia","Ciudad/Barrio", "Departamento/Municipalidad", "Domicilio"],
	structure: {
		'País': {
			name: 'País'
		},
		'Provincia': {
			name: 'Provincia'
		},
		"Ciudad/Barrio": {
			name: 'Ciudad/Barrio'
		},
		'Departamento/Municipalidad': {
			name: 'Departamento/Municipalidad'
		},
		'Domicilio': {
			name: 'Domicilio'
		},
	}
};
