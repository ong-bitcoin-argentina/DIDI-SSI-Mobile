import { CredentialDocument } from "didi-sdk";
import strings from "../presentation/resources/strings";
const { Semillas } = strings.specialCredentials;
const { keys } = Semillas;

// Conditions
const isIdentityCrendential = (credential: any): boolean => {
	return credential.category.includes("identity");
};

const isSemillasIdentityCredential = (credential: CredentialDocument): boolean => {
	return isSemillasCrendential(credential) && isIdentityCrendential(credential);
};

const isSemillasBenefitCrendential = (credential: CredentialDocument): boolean => {
	return !!(isSemillasCrendential(credential) && credential.category?.includes("benefit"));
};

const isValidCredential = (credential: CredentialDocument): boolean => {
	return !credential.expireAt || credential.expireAt > Date.now();
};

const isSemillasIdentityValidCredential = (credential: CredentialDocument): boolean => {
	return (
		credential &&
		isSemillasIdentityCredential(credential) &&
		isValidCredential(credential) &&
		!!getFullName(credential.data)
	);
};

const isSemillasBenefitValidCredential = (credential: CredentialDocument): boolean => {
	return credential && isSemillasBenefitCrendential(credential) && isValidCredential(credential);
};

export const isSemillasCrendential = (credential: any): boolean => {
	return credential.title.toLowerCase().includes(Semillas.title);
};

// Getters
export const getDniBeneficiario = (data: any) => {
	return data[keys.dniBeneficiario];
};

export const getFullName = (data?: any) => {
	return data[keys.nameBeneficiario];
};

export const getSemillasBenefitCredential = (credentials?: CredentialDocument[]): any => {
	return credentials ? credentials.find(isSemillasBenefitValidCredential) : [];
};

export const getSemillasIdentitiesCredentials = (credentials?: CredentialDocument[]): any[] => {
	return credentials ? credentials.filter(isSemillasIdentityValidCredential) : [];
};

export const getSemillasIdentitiesData = (credentials?: CredentialDocument[]): any[] => {
	return getSemillasIdentitiesCredentials(credentials).map(item => item.data);
};

export const haveValidIdentityAndBenefit = (credentials?: CredentialDocument[]): boolean => {
	return !!(
		credentials &&
		credentials.some(isSemillasIdentityValidCredential) &&
		credentials.some(isSemillasBenefitValidCredential)
	);
};
