export class Articulo{        
	
    ID: string;
	Descripcion: string;
	Activo: string;
	ID_Almacen: string;
	DescAlmacen: string;
	Locacion: string;
	ID_Categoria: string;
	DescCategoria: string;
	ID_Subcategoria: string;
	DescSubategoria: string;
	ID_Moneda: string;
	ID_UMCompra: string;
	ID_UMBase: string;
	DescUMBase: string;
	ID_UMVenta: string;
	DescUMVenta: string;
	Costo: number=0;
	UltimoCosto: number=0;
	UltimaEntrada: string; //date
	UltimaSalida: string; //date
	Existencias: number=0;
	ExistenciasFisicas: number=0;
	uaFecha: string; //date
	uaUsuario: string;
	crFecha: string; //date
	crUsuario: string;
	Notas: string;
	Aloha: string;
	PeriodicidadConteo: string;
	PorcentajeIVA: number=0;
	PorcentajeIEPS: number=0;
	CostoAdicional: number=0;
	Flete: number=0;
	StockMaximo: number;
	StockMinimo: number;
	CuentaContable: string;
	CodigoBarras: string;
	TipoAP: string;
	ID_MenuItem: string;
	Keywords: string;
	ListaCategorias: string;
	ListaSubcategorias: string;
	ListaAlmacenes: string;
	ListaLocaciones: string;
	ListaUM: string;
	ListaMarcas: string;
	ListaAlmacenesLocaciones: string;
	ListaProveedores: any[];
	serviceURL?: string= "http://noiseapp.com.mx/hawk/process-articulos.php";
}