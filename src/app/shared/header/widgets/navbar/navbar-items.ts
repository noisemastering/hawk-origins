// Menu
export interface Menu {
  path?: string;
  title?: string;
  type?: string;
  megaMenu?: boolean;
  megaMenuType?: string; // small, medium, large
  image?: string;
  children?: Menu[];
}

export const MENUITEMS: Menu[] = [
	{
		title: 'Catálogos', type: 'sub', megaMenu: true, megaMenuType: 'medium', children: [
	      	{ path: 'catalogos/almacenes', title: 'Almacenes', image:'assets/images/menu/almacenes.png', type: 'link' },          
	      	{ path: 'catalogos/proveedores', title: 'Proveedores', image:'assets/images/menu/proveedores.png', type: 'link'},         
	      	{ path: 'catalogos/unidades-de-medida', title: 'Unidades de medida', image:'assets/images/menu/medida.png', type: 'link' },         
	      	{ path: 'catalogos/articulos/interfaz', title: 'Interfaz', image: 'assets/images/menu/categorias.png', type: 'link' },        
	    	{ path: 'catalogos/articulos/maestro', title: 'Catálogo maestro', image: 'assets/images/menu/subcategorias.png', type: 'link' },        
	      	{ path: 'catalogos/articulos', title: 'Artículos', image: 'assets/images/menu/articulos.png', type: 'link' },        
	    	{ path: 'catalogos/articulos-inactivos', title: 'Artículos inactivos', image: 'assets/images/menu/inactivos.png', type: 'link' },    
			{ path: 'catalogos/conceptos', title: 'Conceptos', image: 'assets/images/menu/conceptos.png', type: 'link' },
			{ path: 'catalogos/centros-de-consumo', title: 'Cen tros de comsumo', image: 'assets/images/menu/consumo.png', type: 'link' }
	    ]
	},
	{
		title: 'Inventarios', type: 'sub', megaMenu: true, megaMenuType: 'medium', children: [
	    	{ path: 'inventarios/movimientos', title: 'Movimientos', image: 'assets/images/menu/movimientos.png', type: 'link' },
			{ path: 'inventarios/movimientos-por-escaner', title: 'Movimientos por escáner', image: 'assets/images/menu/escaner.png', type: 'link' },
			{ path: 'inventarios/conteos-fisicos', title: 'Conteos físicos', image: 'assets/images/menu/conteos.png', type: 'link' },
	      	{ path: 'inventarios/cierre-mensual', title: 'Cierre mensual',  image: 'assets/images/menu/cierre.png', type: 'link' },
	      	{ path: 'inventarios/mermas', title: 'Mermas', image: 'assets/images/menu/mermas.png', type: 'link' },
	      	{ path: 'inventarios/traspasos-entre-unidades', title: 'Traspasos entre unidades', image: 'assets/images/menu/traspasos.png', type: 'link' },
			{ path: 'inventarios/costos', title: 'Costos', image: 'assets/images/menu/costos.png', type: 'link' },
	    ]
	},
	{
		title: 'Compras', type: 'sub', megaMenu: true, megaMenuType: 'medium', children: [
	      	{ path: 'compras/1', title: 'Ingresos', image: 'assets/images/menu/ingresos.png', type: 'link' },
	      	{ path: 'compras/1', title: 'Ingresos por escáner', image: 'assets/images/menu/escaner.png', type: 'link' },
	      	{ path: 'compras/lista-ordenes', title: 'Ordenes de compra', image: 'assets/images/menu/ordenes.png', type: 'link' },
	      	{ path: 'compras/1', title: 'Facturas', image: 'assets/images/menu/facturas.png', type: 'link' }
	    ]
	},
	{
		title: 'Ventas', type: 'sub', megaMenu: true, megaMenuType: 'medium', children:[
			{ path: 'ventas/elementos-de-menu', title: 'Elementos de menú', image: 'assets/images/menu/elementos.png', type: 'link' },
	      	{ path: 'ventas/recetas', title: 'Recetas y subrecetas', image: 'assets/images/menu/recetas.png', type: 'link' },  
	      	{ path: 'ventas/interfaz-pos', title: 'Interfaz POS', image: 'assets/images/menu/pos.png', type: 'link' },    
	      	{ path: 'ventas/paquetes', title: 'Banquetes', image: 'assets/images/menu/banquetes.png', type: 'link' },  
			{ path: 'ventas/pedidos', title: 'Pedidos', image: 'assets/images/menu/pedidos.png', type: 'link' },
			{ path: 'ventas/clientes', title: 'Clientes', image: 'assets/images/menu/clientes.png', type: 'link' },
			{ path: 'ventas/eventos', title: 'Eventos', image: 'assets/images/menu/eventos.png', type: 'link' },
			{ path: 'ventas/localidades', title: 'Localidades', image: 'assets/images/menu/localidades.png', type: 'link' }
	    ]
	},
	{
		title: 'Reportes', type: 'sub', children:[
			{ path: 'ventas/elementos-de-menu', title: 'Elementos de menú', type: 'link' },
	      	{ path: 'ventas/recetas', title: 'Recetas y subrecetas', type: 'link' },  
	      	{ path: 'ventas/interfaz-pos', title: 'Interfaz POS', type: 'link' },    
	      	{ path: 'ventas/banquetes', title: 'Banquetes', type: 'link' },  
			{ path: 'ventas/pedidos', title: 'Pedidos', type: 'link' },
			{ path: 'ventas/inventarios', title: 'Inventarios', type: 'link' }  
	    ]
	}
]