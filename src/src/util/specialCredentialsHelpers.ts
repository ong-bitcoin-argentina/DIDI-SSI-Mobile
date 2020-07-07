import { SpecialCredentialMap } from "../store/selector/credentialSelector";
import strings from "../presentation/resources/strings";
const { PhoneNumberData, EmailData } = strings.specialCredentials;

export const getPhoneNumber = (specialCredentials:SpecialCredentialMap):any => {
    return specialCredentials[PhoneNumberData.key]?.data.phoneNumber;
}

export const getEmail = (specialCredentials:SpecialCredentialMap):any => {
    return specialCredentials[EmailData.key]?.data.email;
}

export const haveEmailAndPhone = (specialCrdentials:SpecialCredentialMap):boolean => {
    return !!(getEmail(specialCrdentials) && getPhoneNumber(specialCrdentials));
}
