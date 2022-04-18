export type IReturnGetInformation = IReturnError & IGetInformation;

interface IReturnError {
    status:    string;
    errorCode: string;
    message:   string;
}


interface IGetInformation {
    status: string;
    data:   IGetInformationData;
}

interface IGetInformationData {
    code:    number;
    message: string;
    ocr:     Ocr;
    barcode: Barcode;
}


interface Barcode {
    contains: boolean;
    readed:   boolean;
    data:     BarcodeData;
}

interface BarcodeData {
    number:           string;
    names:            string;
    birthdate:        string;
    gender:           string;
    prefixSuffixCuil: string;
    lastNames:        string;
    copy:             string;
    issueDate:        string;
    birthDate:        string;
    order:            string;
}

interface Ocr {
    lastNames: string;
    gender:    string;
    birthdate: Date;
    names:     string;
    number:    string;
    extra:     Extra;
}

interface Extra {
    additional: string;
    mrz:        string;
}