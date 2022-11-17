import { Usuario } from "./usuario";

export class NAUserGroup{

    ID: number;
    Nombre: string;
    Permisos: string;
    Notas: string;
    CRDBMultiple: number;
    User: Usuario[];
}