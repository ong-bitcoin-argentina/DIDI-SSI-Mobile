import { CredentialDocument } from "didi-sdk";
import strings from '../presentation/resources/strings';
const { Semillas } = strings.specialCredentials;
const { keys } = strings.specialCredentials.Semillas;

// Conditions
const isIdentityCrendential = (credential:any):boolean => {
	return credential.category.includes('identity');
}

const isSemillasTitular = (data):boolean => {
	return data[keys.relationship] ? data[keys.relationship].includes('titular') : false;
}

export const isSemillasCrendential = (credential:any):boolean => {
	return credential.title.toLowerCase().includes(Semillas.title);
}

export const isSemillasIdentityCredential = (credential:CredentialDocument):boolean => {
	return isSemillasCrendential(credential) && isIdentityCrendential(credential);
}

export const isSemillasIdentityTitularCredential = (credential:CredentialDocument):boolean => {
	return (isSemillasIdentityCredential(credential) && isSemillasTitular(credential.data));
}

export const isSemillasBenefitCrendential = (credential:any):boolean => {
	return isSemillasCrendential(credential) && credential.category.includes('benefit');
}

// Getters
export const getDniBeneficiario = (data) => {
	return data[keys.dniBeneficiario];
}

export const getFullName = (data?:any) => {
	return data[keys.nameBeneficiario];
}

export const getSemillasIdentitiesData = (credentials?:CredentialDocument[]):any[] => {
	return credentials ? credentials.filter(isIdentityCrendential).map(item => item.data) : [];
}

export const mustHavePrestadoresEnabled = (credentials?:CredentialDocument[]):boolean => {
	return !!(credentials && (credentials.some(isSemillasIdentityCredential) && credentials.some(isSemillasBenefitCrendential)));
}