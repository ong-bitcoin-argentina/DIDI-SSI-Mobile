export type IReturnCheckValidateDni = ICheckValidateDni | IReturnError;

interface IReturnError {
    status:    string;
    errorCode: string;
    message:   string;
    data: {
        status: string,
    }
}

interface ICheckValidateDni {
    status: string;
    data: Data;
}
interface Data {
    status: string;
    operationId: string;
    did: string;
}
