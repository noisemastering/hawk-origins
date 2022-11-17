import { NAProfile } from "./NAProfile";
import { NAUserGroup } from "./NAUserGroup";

export class Usuario{

    ID: number;
    Clave: string;
    BusinessID: number;
    GroupID: number;
    Password: string;
    Status: string;
    Token: string;
    Creado?: string;
    Creo: number;
    Modificado?: string;
    Modifico: number;
    Login?: string;
    
    Profile: NAProfile;

    UserGroup: NAUserGroup;

    generateToken(key1: string, key2: string){
        this.Token= "token";
    }
}