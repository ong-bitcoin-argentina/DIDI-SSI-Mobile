export type IReturnCreate = IReturnError & IVerification;


interface IReturnError {
    status:    string;
    errorCode: string;
    message:   string;
}

interface IVerification {
    status: string;
    data:   Data;
}
interface Data {
    code:        number;
    message:     string;
    operationId: number;
    userName:    string;
}
