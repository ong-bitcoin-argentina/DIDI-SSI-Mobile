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

const isActiveCredential = (credential: CredentialDocument): boolean => {
	return !credential.expireAt || credential.expireAt > Date.now();
};

const isSemillasIdentityActiveCredential = (credential: CredentialDocument, context: any): boolean => {
	return (
		credential &&
		isSemillasIdentityCredential(credential) &&
		isActiveCredential(credential) &&
		!!getFullName(credential.data)
	);
};

const isSemillasBenefitActiveCredential = (credential: CredentialDocument): boolean => {
	return credential && isSemillasBenefitCrendential(credential) && isActiveCredential(credential);
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
	return credentials ? credentials.find(isSemillasBenefitActiveCredential) : [];
};

export const getSemillasIdentitiesCredentials = (credentials: CredentialDocument[] = []): any[] => {
	return credentials
		.filter(isSemillasIdentityActiveCredential)
		.sort((a, b) => getFullName(a.data) > getFullName(b.data));
};

export const getSemillasIdentitiesData = (credentials?: CredentialDocument[]): any[] => {
	return getSemillasIdentitiesCredentials(credentials).map(item => item.data);
};

export const haveValidIdentity = (credentials: CredentialDocument[] = []): boolean => {
	return !!credentials.some(isSemillasIdentityActiveCredential);
};

export const haveValidIdentityAndBenefit = (credentials: CredentialDocument[] = []): boolean => {
	return !!(
		credentials.some(isSemillasIdentityActiveCredential) && credentials.some(isSemillasBenefitActiveCredential)
	);
};
