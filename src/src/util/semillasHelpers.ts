import { CredentialDocument } from "didi-sdk";

const getRelationship = (credential:any) => {
	return credential.data['Relacion con Titular'].toLowerCase();
}

const semillasCredentialCondition = (credential:any) => {
	return credential.title.toLowerCase().includes('semillas');
}

export const semillasTitularCondition = (credential:any) => {
	return getRelationship(credential).includes('titular');
}

export const semillasFamiliarCondition = (credential:any) => {
	return getRelationship(credential).includes('familiar');
}

export const getSemillasCredentials = (credentials:CredentialDocument[]) => {
	return credentials.filter(semillasCredentialCondition);
}

export const ownSemillasCredentialCondition = (credential:CredentialDocument) => {
	return (semillasTitularCondition(credential) || credential.data);
}