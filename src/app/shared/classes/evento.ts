export class Evento {
    ID: string;
    ID_Cliente: string;
    Descripcion: string;
    Status: string;
    FechaInicio: string;
    FechaFin: string;
    ID_Localidad: string;
    Direccion: string;
    NumComensales: string;
    NumBatch: string;
    Notas: string;
    crFecha: string;
    crUsuario: string;
    uaFecha: string;
    uaUsuario: string;
    Keywords: string;
    serviceURL?: string = "http://noiseapp.com.mx/hawk/process-evento.php";
}