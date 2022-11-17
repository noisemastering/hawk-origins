import { NAProveedor } from "./NAProveedor";

export class NARazonSocial
    {
        RazonSocialID: number;
        ProveedorID: number;
        RazonSocial: string;
        Email: string;
        RFC: string;
        Calle: string;
        Interior: string;
        Exterior: string;
        CodigoPostal: string;
        CodigoPostalID: number;
        Colonia: string;
        Municipio: string;
        Estado: string;

        Proveedor: NAProveedor;
    }