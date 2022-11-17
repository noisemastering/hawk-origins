import { Routes, RouterModule } from '@angular/router';

import { ListaAlmacenesComponent } from './catalogos/almacenes/lista-almacenes/lista-almacenes.component';
import { AgregarAlmacenComponent } from './catalogos/almacenes/agregar-almacen/agregar-almacen.component';
import { CatalogosComponent } from './catalogos/catalogos.component';
import { HawkComponent } from './hawk/hawk.component';
import { DashboardComponent } from './hawk/dashboard/dashboard.component';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { SistemaComponent } from './sistema/sistema.component';
import { PanelCatalogosComponent } from './catalogos/panel-catalogos/panel-catalogos.component';
import { ListaProveedoresComponent } from './catalogos/proveedores/lista-proveedores/lista-proveedores.component';
import { ListaArticulosComponent } from './catalogos/articulos/lista-articulos/lista-articulos.component';
import { VentasComponent } from './ventas/ventas.component';
import { PanelVentasComponent } from './ventas/panel-ventas/panel-ventas.component';
import { DetalleRecetaComponent } from './ventas/recetas/detalle-receta/detalle-receta.component';
import { RecetaEnPreparacionComponent } from './ventas/receta-en-preparacion/receta-en-preparacion.component';
import { LoginComponent } from './usuarios/login/login.component';
import { AuthGuard } from './usuarios/auth.guard';
import { AgregarArticuloComponent } from './catalogos/articulos/agregar-articulo/agregar-articulo.component';
import { ArticulosComponent } from './catalogos/articulos/articulos/articulos.component';
import { EditarArticuloComponent } from './catalogos/articulos/editar-articulo/editar-articulo.component';
import { ListaUnidadesDeMedidaComponent } from './catalogos/unidades-de-medida/lista-unidades-de-medida/lista-unidades-de-medida.component';
import { ListaCategoriasComponent } from './catalogos/categorias/lista-categorias/lista-categorias.component';
import { ListaSubcategoriasComponent } from './catalogos/subcategorias/lista-subcategorias/lista-subcategorias.component';
import { ListaConceptosComponent } from './catalogos/conceptos/lista-conceptos/lista-conceptos.component';
import { ListaArticulosInactivosComponent } from './catalogos/articulos/lista-articulos-inactivos/lista-articulos-inactivos.component';
import { ListaClientesComponent } from './ventas/eventos/clientes/lista-clientes/lista-clientes.component';
import { ListaEventosComponent } from './ventas/eventos/lista-eventos/lista-eventos.component';
import { ListaPaquetesComponent } from './ventas/banquetes/lista-paquetes/lista-paquetes.component';
import { ListaElementosDeMenuComponent } from './ventas/elementos-de-menu/lista-elementos-de-menu/lista-elementos-de-menu.component';
import { ListaLocalidadesComponent } from './ventas/eventos/localidades/lista-localidades/lista-localidades.component';
import { ListaPersonalComponent } from './ventas/eventos/personal/lista-personal/lista-personal.component';
import { componentFactoryName } from '@angular/compiler';
import { ListaCategoriaComponent } from './ventas/eventos/personal/lista-categoria/lista-categoria.component';
import { ListaTiemposComponent } from './ventas/eventos/tiempos/lista-tiempos/lista-tiempos.component';
import { InventariosComponent } from './inventarios/inventarios.component';
import { PanelInventariosComponent } from './inventarios/panel-inventarios/panel-inventarios.component';
import { EntradasComponent } from './inventarios/movimientos/entradas/entradas.component';
import { SalidasComponent } from './inventarios/movimientos/salidas/salidas.component';
import { TraspasosComponent } from './inventarios/movimientos/traspasos/traspasos.component';
import { MovimientosComponent } from './inventarios/movimientos/movimientos.component';
import { PanelMovimientosComponent } from './inventarios/movimientos/panel-movimientos/panel-movimientos.component';
import { ListaEntradasComponent } from './inventarios/movimientos/lista-entradas/lista-entradas.component';
import { CanActivate } from '@angular/router/src/utils/preactivation';
import { ConteosFisicosComponent } from './inventarios/conteos/conteos-fisicos/conteos-fisicos.component';
import { LocacionesPorAlmacenComponent } from './inventarios/conteos/locaciones-por-almacen/locaciones-por-almacen.component';
import { ListaLocacionesComponent } from './catalogos/locaciones/lista-locaciones/lista-locaciones.component';
import { IngresoPorScannerComponent } from './inventarios/ingreso-por-scanner/ingreso-por-scanner.component';
import { ListaCentrosConsumoComponent } from './catalogos/centros-de-consumo/lista-centros-consumo/lista-centros-consumo.component';
import { ListaInterfazComponent } from './catalogos/articulos/lista-interfaz/lista-interfaz.component';
import { ImportarArticuloComponent } from './catalogos/articulos/importar-articulo/importar-articulo.component';
import { ListaMaestroComponent } from './catalogos/articulos/lista-maestro/lista-maestro.component';
import { EditarMaestroComponent } from './catalogos/articulos/editar-maestro/editar-maestro.component';
import { DetalleMaestroComponent } from './catalogos/articulos/detalle-maestro/detalle-maestro.component';
import { AgregarMaestroComponent } from './catalogos/articulos/agregar-maestro/agregar-maestro.component';
import { DescargarArticuloComponent } from './catalogos/articulos/descargar-articulo/descargar-articulo.component';
import { ArticulosLocacionesComponent } from './catalogos/articulos/articulos-locaciones/articulos-locaciones.component';
import { LocacionesArticulosComponent } from './catalogos/locaciones/locaciones-articulos/locaciones-articulos.component';
import { LocacionesArticulosListaComponent } from './catalogos/locaciones/locaciones-articulos-lista/locaciones-articulos-lista.component';
import { ListaMovimientosComponent } from './inventarios/movimientos/lista-movimientos/lista-movimientos.component';
import { ListaComprasComponent } from './inventarios/compras/lista-compras/lista-compras.component';
import { ProveedoresComponent } from './catalogos/proveedores/proveedores/proveedores.component';
import { RazonesSocialesComponent } from './catalogos/proveedores/razones-sociales/razones-sociales.component';
import { ComprasComponent } from './inventarios/compras/compras/compras.component';
import { AgregarCompraComponent } from './inventarios/compras/agregar-compra/agregar-compra.component';
import { EditarCompraComponent } from './inventarios/compras/editar-compra/editar-compra.component';
import { EliminarCompraComponent } from './inventarios/compras/eliminar-compra/eliminar-compra.component';
import { AsignarArticulosComponent } from './inventarios/movimientos/asignar-articulos/asignar-articulos.component';
import { LocacionesCentrosConsumoComponent } from './catalogos/locaciones/locaciones-centros-consumo/locaciones-centros-consumo.component';
import { ArticulosProveedoresComponent } from './catalogos/articulos/articulos-proveedores/articulos-proveedores.component';
import { CentrosLocacionesComponent } from './catalogos/centros-de-consumo/centros-locaciones/centros-locaciones.component';
import { DetalleMovimientoComponent } from './inventarios/movimientos/detalle-movimiento/detalle-movimiento.component';

export const rootRouterConfig: Routes = [
  { 
    path: '', 
    redirectTo: 'hawk', 
    pathMatch: 'full' 
  },
  {
    path: 'hawk',
    component: HawkComponent,
    children:[
      {
        path: '', 
        redirectTo: 'dashboard', 
        pathMatch: 'full'
      },
      {
        path:'dashboard',
        component: DashboardComponent,
        canActivate: [AuthGuard]
      },
      {
        path:'catalogos',
        component: CatalogosComponent,
        children:[
          {
            path:'',
            redirectTo:'panel-catalogos',
            pathMatch:'full'
          },
          {
            path:'panel-catalogos',
            component: PanelCatalogosComponent,
            canActivate: [AuthGuard]
          },
          {
            path:'almacenes',
            component: ListaAlmacenesComponent,
            canActivate: [AuthGuard]
          },
          {
            path:'locaciones',
            component: ListaLocacionesComponent,
            canActivate:[AuthGuard],
          },
          {
            path: 'locaciones-articulos',
            component: LocacionesArticulosComponent,
            canActivate:[AuthGuard]
          },
          
          {
            path: 'locaciones-articulos-lista/:id',
            component: LocacionesArticulosListaComponent,
            canActivate:[AuthGuard]
          },
          {
            path: 'locaciones-centros-consumo',
            component: LocacionesCentrosConsumoComponent,
            canActivate:[AuthGuard]
          },
          {
            path:'unidades-de-medida',
            component: ListaUnidadesDeMedidaComponent,
            canActivate: [AuthGuard]
          },
          {
            path:'categorias',
            component: ListaCategoriasComponent,
            canActivate: [AuthGuard]
          },
          {
            path:'subcategorias',
            component: ListaSubcategoriasComponent,
            canActivate: [AuthGuard]
          },
          {
            path:'proveedores',
            component: ProveedoresComponent,
            children:[
              {
                path:'',
                redirectTo: 'lista-proveedores',
                pathMatch: 'full'
              },
              {
                path: 'lista-proveedores',
                component: ListaProveedoresComponent,
                canActivate: [AuthGuard]
              },
              {
                path: 'razones-sociales/:id',
                component: RazonesSocialesComponent,
                canActivate: [AuthGuard]
              }
            ]
          },
          {
            path:'conceptos',
            component: ListaConceptosComponent,
            canActivate: [AuthGuard]
          },
          {
            path:'centros-de-consumo',
            component: ListaCentrosConsumoComponent,
            canActivate: [AuthGuard]
          },
          {
            path:'centros-locaciones',
            component: CentrosLocacionesComponent,
            canActivate: [AuthGuard]
          },
          {
            path:'articulos',
            component: ArticulosComponent,
            canActivate: [AuthGuard],
            children:[
              {
                path:'',
                redirectTo: 'lista-articulos',
                pathMatch: 'full'
              },
              {
                path:'lista-articulos',
                component: ListaArticulosComponent,
                canActivate: [AuthGuard]
              },
              {
                path:'agregar',
                component: AgregarArticuloComponent,
                canActivate: [AuthGuard]
              },
              {
                path:'editar/:id',
                component: EditarArticuloComponent,
                canActivate: [AuthGuard]
              },
              {
                path:'articulos-proveedores/:id',
                component: ArticulosProveedoresComponent,
                canActivate: [AuthGuard]
              },
              {
                path:'inactivos',
                component: ListaArticulosInactivosComponent,
                canActivate: [AuthGuard]
              },
              {
                path:'interfaz',
                component: ListaInterfazComponent,
                canActivate: [AuthGuard]
              },
              {
                path:'importar/:id',
                component: ImportarArticuloComponent,
                canActivate: [AuthGuard]
              },
              {
                path: 'maestro',
                component: ListaMaestroComponent,
                canActivate:[AuthGuard]
              },
              {
                path: 'agregar-maestro',
                component: AgregarMaestroComponent,
                canActivate:[AuthGuard]
              },
              {
                path: 'editar-maestro/:id',
                component: EditarMaestroComponent,
                canActivate:[AuthGuard]
              },
              {
                path: 'detalle-maestro/:id',
                component: DetalleMaestroComponent,
                canActivate:[AuthGuard]
              },
              {
                path: 'descargar-articulo/:id',
                component: DescargarArticuloComponent,
                canActivate:[AuthGuard]
              },
              {
                path: 'articulos-locaciones/:ida/:idl',
                component: ArticulosLocacionesComponent,
                canActivate:[AuthGuard]
              }
            ]
          }
        ]
      },
      {
        path: 'ventas',
        component: VentasComponent,
        children:[
          {
            path: '',
            redirectTo:'panel-ventas',
            pathMatch:'full'
          },
          {
            path:'panel-ventas',
            component: PanelVentasComponent,
            canActivate: [AuthGuard]
          },
          {
            path: 'elementos-de-menu',
            component: ListaElementosDeMenuComponent,
            canActivate: [AuthGuard]
          },
          {
            path:'receta-en-preparacion',
            component: RecetaEnPreparacionComponent,
            canActivate: [AuthGuard]
          },
          {
            path:'clientes',
            component: ListaClientesComponent,
            canActivate: [AuthGuard]
          },
          {
            path:'eventos',
            component: ListaEventosComponent,
            canActivate: [AuthGuard]
          },
          {
            path: 'paquetes',
            component: ListaPaquetesComponent,
            canActivate:[AuthGuard]
          },
          {
            path: 'localidades',
            component: ListaLocalidadesComponent,
            canActivate: [AuthGuard]
          },
          {
            path: 'personal',
            component: ListaPersonalComponent,
            canActivate:[AuthGuard]
          },
          {
            path:'categorias-personal',
            component: ListaCategoriaComponent,
            canActivate:[AuthGuard]
          },
          {
            path:'tiempos',
            component: ListaTiemposComponent,
            canActivate:[AuthGuard]
          }
        ]
      },
      {
        path: 'inventarios',
        component: InventariosComponent,
        children: [
          {
            path: '',
            redirectTo:'panel-inventarios',
            pathMatch:'full'
          },
          {
            path:'panel-inventarios',
            component: PanelInventariosComponent,
            canActivate: [AuthGuard]
          },
          {
            path: 'compras',
            component: ComprasComponent,
            children:[
              {
                path: '',
                redirectTo: 'lista-compras',
                pathMatch: 'full'
              },
              {
                path:'lista-compras',
                component: ListaComprasComponent,
                canActivate:[AuthGuard]
              },
              {
                path:'agregar-compra',
                component: AgregarCompraComponent,
                canActivate:[AuthGuard]
              },
              {
                path:'editar-compra',
                component: EditarCompraComponent,
                canActivate:[AuthGuard]
              },
              {
                path:'eliminar-compra',
                component: EliminarCompraComponent,
                canActivate:[AuthGuard]
              },
              {
                path:'detalle-compra',
                component: AgregarCompraComponent,
                canActivate:[AuthGuard]
              }
            ]
          },
          {
            path:'almacenes',
            component: LocacionesPorAlmacenComponent,
            canActivate:[AuthGuard]
          },
          {
            path: 'conteos-fisicos',
            component: ConteosFisicosComponent,
            canActivate:[AuthGuard]
          },
          {
            path: 'locaciones-por-almacen',
            component: LocacionesPorAlmacenComponent,
            canActivate:[AuthGuard]
          },
          {
            path: 'movimientos',
            component: MovimientosComponent,
            children:[
              {
                path: '',
                redirectTo:'lista-movimientos',
                pathMatch:'full'
              },
              {
                path: 'detalle-movimiento/:id',
                component: DetalleMovimientoComponent,
                canActivate: [AuthGuard]
              },
              {
                path: 'asignar-articulos/:id',
                component: AsignarArticulosComponent,
                canActivate: [AuthGuard]
              },
              {
                path: 'lista-movimientos',
                component: ListaMovimientosComponent,
                canActivate: [AuthGuard]
              },
              {
                path: 'panel-movimientos',
                component: PanelMovimientosComponent,
                canActivate: [AuthGuard]
              },
              {
                path: 'entradas',
                component: EntradasComponent,
                canActivate: [AuthGuard]
              },
              {
                path: 'lista-entradas',
                component: ListaEntradasComponent,
                canActivate: [AuthGuard]
              },
              {
                path:'salidas',
                component: SalidasComponent,
                canActivate: [AuthGuard]
              },
              {
                path: 'traspasos',
                component: TraspasosComponent,
                canActivate: [AuthGuard]
              },
              {
                path: 'ingreso-por-scanner',
                component: IngresoPorScannerComponent,
                canActivate:[AuthGuard]
              }
            ]
          }
        ]
      }
    ]
  },
  {
    path:'usuario',
    component: UsuariosComponent,
    children:[
      {
        path:'',
        redirectTo:'login',
        pathMatch: 'full'
      },
      {
        path: 'login',
        component: LoginComponent
      }
    ]
  },
  {
    path:'sistema',
    component: SistemaComponent
  }
];

