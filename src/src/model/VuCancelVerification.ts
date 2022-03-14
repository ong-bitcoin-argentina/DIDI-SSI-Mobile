export type IReturnCancel = IReturnError & ICancel;

 interface ICancel {
    status: string;
    data: Data;
}
interface Data {
    code: number;
    message: string;
}

interface IReturnError {
    status?:    string;
    errorCode?: string;
    message:   string;
}
