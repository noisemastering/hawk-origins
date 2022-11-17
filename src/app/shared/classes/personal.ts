export class Personal{
    ID: string;
    Descripcion: string;
    ID_Categoria: string;
    Costo: string;
    Notas: string;
    crFecha: string;
    crUsuario: string;
    uaFecha: string;
    uaUsuario: string;
    Keywords: string;
    NombreCategoria: string;
    serviceURL?: string = "http://noiseapp.com.mx/hawk/process-personal.php";
}