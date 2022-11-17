export class Paquete {
    ID: string;
    Descripcion: string;
    Notas: string;
    ID_Localidad: string; 
    uaFecha: string;
    uaUsuario: string;
    crFecha: string;
    crUsuario: string;
    Keywords: string;
    serviceURL?: string = "http://noiseapp.com.mx/hawk/process-paquete.php";
}