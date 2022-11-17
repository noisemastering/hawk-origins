import { NARazonSocial } from "./NARazonSocial";
import { Usuario } from "./usuario";

export class NAProveedor{
    
    ProveedorID: number;
    Nombre: string;
    Email: string;
    Generales: string;
    Credito: number;
    Ciudad: string;
    Entidad: string;
    Pais: string;
    Creado: string;
    Creo: number;
    Modificado: string;
    Modifico: number;

    RazonesSociales: NARazonSocial;

    UserCreo: Usuario;
    UserModifico: Usuario;
    
}