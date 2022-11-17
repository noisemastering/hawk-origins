export class Request{
    usuario: any;
    object: any;
    action: "select"|"add"|"delete"|"update"|"process"|"list"|"search"|"ducplicate"|"keyvalue"|"keyvalueLocaciones"|"keyvalueID"|"subscribe"|"login";
    process: string;
    extraValue: string[];
}