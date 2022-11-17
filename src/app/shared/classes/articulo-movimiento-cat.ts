export class ArticuloMovimientoCat{
    AutoID: string;
    ID_Comanda: string;
    Seq: string;
    NumBatch: string;
    ID_Articulo: string;
    DescArticulo: string;
    ID_Concepto: string;
    DescConcepto: string;
    Tipo: string;
    Fecha: string;
    ID_Proveedor: string;
    ID_Almacen: string;
    Locacion: string;
    Cantidad: string;
    Costo: string;
    Referencia: string;
    Fecha_Mov: string;
    SeriesRef: string;
    Notas: string;
    ID_Requisicion: string;
    ID_UM: string;
    ID_UMMov: string;
    CostoXTransferencia: string;
    Descuento: string;
    ServiceURL: string = 'http://noiseapp.com.mx/hawk/process-movimiento.php';
}