export class Cliente{
    ID: string;
    Descripcion: string;
    Direccion1: string;
    Direccion2: string;
    Direccion3: string;
    Telefonos: string;
    DelegacionMunicipio: string;
    Ciudad: string;
    Estado: string;
    CP: string;
    Turno: string;
    Notas: string;
    uaFecha: string;
    uaUsuario: string;
    crFecha: string;
    crUsuario: string;
    Keywords: string;
    serviceURL?: string = "http://noiseapp.com.mx/hawk/process-cliente.php";
}