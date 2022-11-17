export class Tiempo {
    ID: string;
    Orden: string;
    Descripcion: string;
    Notas: string;
    crFecha: string;
    crUsuario: string;
    uaFecha: string;
    uaUsuario: string;
    Keywords: string;
    serviceURL?: string = "http://noiseapp.com.mx/hawk/process-tiempo.php";
}