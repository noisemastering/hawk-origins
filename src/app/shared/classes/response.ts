export class Response{
    status: "ok"|"error"|"incomplete";
    message: string;
    object: any;
    delete: string;
}