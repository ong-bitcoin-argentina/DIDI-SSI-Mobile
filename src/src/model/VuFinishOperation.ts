export type IFinishOperation = IReturnError | FinishOperation;


interface IReturnError {
    status:    string;
    errorCode: string;
    message:   string;
}


interface FinishOperation {
    status: string;
    data:   DocumentDataVuData;
}

interface DocumentDataVuData {
    code:               number;
    message:            string;
    operationStatusId:  number;
    confidence:         number;
    confidenceTotal:    number;
    ocr:                Ocr;
    barcode:            Barcode;
    confidenceDocument: number;
    anomalies:          Anomalies;
    identical:          boolean;
}

interface Anomalies {
    textValidationsDocumentData:      string;
    textValidationsBarcodeOcr:        string;
    areaValidationsDocumentAnomalies: string;
    textValidationsDocument:          string;
    textValidationsTotal:             string;
    textValidationsMrzOcr:            string;
    textValidationsBarcodeMrz:        string;
    areaValidations:                  string;
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
    mrz:        any;
}
