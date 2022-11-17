export class Localidad{
    ID: string;
    Descripcion: string;
    Notas: string;
    crFecha: string;
    crUsuario: string;
    uaFecha: string;
    uaUsuario: string;
    Keywords: string;
    serviceURL?: string = "http://noiseapp.com.mx/hawk/process-localidad.php";
}