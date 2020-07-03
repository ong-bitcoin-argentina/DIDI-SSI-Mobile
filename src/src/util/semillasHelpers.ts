import { CredentialDocument } from "didi-sdk";
import { SemillasIdentityModel } from '../model/SemillasIdentity';

const keys = {
	relationship: "Relacion con Titular",
	name: "NOMBRE",
	lastName: "APELLIDO",
	nameBeneficiario: "Nombre Beneficiario",
	dniBeneficiario: "Dni Beneficiario",
	dniTitular: "Dni Titular"
}

export const getDniBeneficiario = (data) => {
	return data[keys.dniBeneficiario];
}

export const isSemillasCrendential = (credential:any) => {
	return credential.title.toLowerCase().includes('semillas');
}

export const getSemillasCredentials = (credentials:CredentialDocument[]) => {
	return credentials.filter(isSemillasCrendential).map(credential => credential.data);
}

const isOwnSemillasCredential = (data:SemillasIdentityModel) => {
	return (isSemillasTitular(data) || data);
}

export const getOwnSemillasCredential = (data:SemillasIdentityModel[]) => {
	return data.find(isOwnSemillasCredential);
}

export const getFullName = (data?:any) => {
	return data[keys.nameBeneficiario];
}

export const isSemillasTitular = (data):boolean => {
	return data[keys.relationship] ? data[keys.relationship].includes('titular') : false;
}

export const isSemillasFamiliar = (data):boolean => {
	return data[keys.relationship] ? data[keys.relationship].includes('familiar') : false;
}
