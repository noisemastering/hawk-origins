export class CategoriaPersonal{
   ID: string;
   Descripcion: string;
   Costo: string;
   crFecha: string;
   crUsuario: string;
   uaFecha: string;
   uaUsuario: string;
   Notas: string;
   Keywords: string;
   serviceURL?: string = "http://noiseapp.com.mx/hawk/process-categoria-personal.php";
}