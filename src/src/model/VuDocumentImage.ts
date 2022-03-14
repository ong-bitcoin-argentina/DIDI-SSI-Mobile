export type IReturnImage = (IReturnError & IDocumentImage)|ITCReturnError;

interface IReturnError {
    status?:    string;
    errorCode?: string;
    message:   string;
}


interface ITCReturnError {
    status:    string;
    message:   string;
}

interface IDocumentImage {
    status: string;
    data:   DataImg;
}

interface DataImg {
    code:                       number;
    message:                    string;
    detectedCountry:            string;
    detectedCountryId:          number;
    detectedDocumentCountryId:  number;
    detectedDocumentCountry:    string;
    addBackRequired:            boolean;
    addDocumentPictureRequired: boolean;
    documentPictureDetected:    boolean;
    containsBarcode:            boolean;
    barcodeDetected:            boolean;
}