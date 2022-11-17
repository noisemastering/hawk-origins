import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes, PreloadAllModules } from '@angular/router';
import { Http, HttpModule } from '@angular/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ShopModule } from "./shop/shop.module";
import { SharedModule } from "./shared/shared.module";
import { ToastrModule } from 'ngx-toastr';
import { rootRouterConfig } from './app.routes';

import { MatAutocompleteModule, MatCardModule, MatDialogModule,
  MatProgressSpinnerModule, MatMenuModule, MatIconModule,
  MatToolbarModule, MatButtonModule, MatFormFieldModule,
  MatInputModule, MatSelectModule, MatSortModule,
  MatTableModule, MatPaginatorModule, MatGridListModule,
  MatRadioModule, MatCheckboxModule, MatDatepickerModule,
  MatNativeDateModule, MatSnackBarModule, MatChipsModule, MatExpansionModule
} from '@angular/material';
import { MatTabsModule } from '@angular/material/tabs'; 

//Firestore
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';


// import ngx-translate and the http loader
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import {HttpClient, HttpClientModule} from '@angular/common/http';
// components
import { AppComponent } from './app.component';
import { MainComponent } from './main/main.component';
import { DemoComponent } from './demo/demo.component';
import * as $ from 'jquery';

//import { CollectionBannerTenComponent } from './widgets/collection-banner/collection-banner.component'

import { ListaAlmacenesComponent } from './catalogos/almacenes/lista-almacenes/lista-almacenes.component';
import { AgregarAlmacenComponent } from './catalogos/almacenes/agregar-almacen/agregar-almacen.component';
import { EditarAlmacenComponent } from './catalogos/almacenes/editar-almacen/editar-almacen.component';
import { EliminarAlmacenComponent } from './catalogos/almacenes/eliminar-almacen/eliminar-almacen.component';
import { DetalleAlmacenComponent } from './catalogos/almacenes/detalle-almacen/detalle-almacen.component';
import { CatalogosComponent } from './catalogos/catalogos.component';
import { HawkComponent } from './hawk/hawk.component';
import { SistemaComponent } from './sistema/sistema.component';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { DashboardComponent } from './hawk/dashboard/dashboard.component';
import { PanelCatalogosComponent } from './catalogos/panel-catalogos/panel-catalogos.component';
import { CartWidgetComponent } from './widgets/cart-widget/cart-widget.component';
import { SpinnerComponent } from './widgets/spinner/spinner.component';
import { SubcartWidgetComponent } from './widgets/subcart-widget/subcart-widget.component';
import { ListaProveedoresComponent } from './catalogos/proveedores/lista-proveedores/lista-proveedores.component';
import { AgregarProveedorComponent } from './catalogos/proveedores/agregar-proveedor/agregar-proveedor.component';
import { DetalleProveedorComponent } from './catalogos/proveedores/detalle-proveedor/detalle-proveedor.component';
import { EditarProveedorComponent } from './catalogos/proveedores/editar-proveedor/editar-proveedor.component';
import { EliminarProveedorComponent } from './catalogos/proveedores/eliminar-proveedor/eliminar-proveedor.component';
import { ScafoldingListaComponent } from './catalogos/scafolding/scafolding-lista/scafolding-lista.component';
import { ScafoldingAgregarComponent } from './catalogos/scafolding/scafolding-agregar/scafolding-agregar.component';
import { ScafoldingDetalleComponent } from './catalogos/scafolding/scafolding-detalle/scafolding-detalle.component';
import { ScafoldingEditarComponent } from './catalogos/scafolding/scafolding-editar/scafolding-editar.component';
import { ScafoldingEliminarComponent } from './catalogos/scafolding/scafolding-eliminar/scafolding-eliminar.component';
import { ListaArticulosComponent } from './catalogos/articulos/lista-articulos/lista-articulos.component';
import { AgregarArticuloComponent } from './catalogos/articulos/agregar-articulo/agregar-articulo.component';
import { DetalleArticuloComponent } from './catalogos/articulos/detalle-articulo/detalle-articulo.component';
import { EliminarArticuloComponent } from './catalogos/articulos/eliminar-articulo/eliminar-articulo.component';
import { EditarArticuloComponent } from './catalogos/articulos/editar-articulo/editar-articulo.component';
import { AgregarAlCarritoComponent } from './herramientas/carrito/agregar-al-carrito/agregar-al-carrito.component';
import { RecetaEnPreparacionComponent } from './ventas/receta-en-preparacion/receta-en-preparacion.component';
import { SubrecetaEnPreparacionComponent } from './ventas/subreceta-en-preparacion/subreceta-en-preparacion.component';
import { DetalleSubrecetaComponent } from './ventas/recetas/detalle-subreceta/detalle-subreceta.component';
import { AgregarRecetaComponent } from './ventas/recetas/agregar-receta/agregar-receta.component';
import { AgregarSubrecetaComponent } from './ventas/recetas/agregar-subreceta/agregar-subreceta.component';
import { EditarRecetaComponent } from './ventas/recetas/editar-receta/editar-receta.component';
import { EditarSubrecetaComponent } from './ventas/recetas/editar-subreceta/editar-subreceta.component';
import { EliminarSubrecetaComponent } from './ventas/recetas/eliminar-subreceta/eliminar-subreceta.component';
import { EliminarRecetaComponent } from './ventas/recetas/eliminar-receta/eliminar-receta.component';
import { VentasComponent } from './ventas/ventas.component';
import { PanelVentasComponent } from './ventas/panel-ventas/panel-ventas.component';
import { EliminarIngredienteComponent } from './ventas/recetas/eliminar-ingrediente/eliminar-ingrediente.component';
import { EditarIngredienteComponent } from './ventas/recetas/editar-ingrediente/editar-ingrediente.component';
import { DetalleIngredienteComponent } from './ventas/recetas/detalle-ingrediente/detalle-ingrediente.component';
import { AgregarIngredienteComponent } from './ventas/recetas/agregar-ingrediente/agregar-ingrediente.component';
import { LoginComponent } from './usuarios/login/login.component';
import { ListaUnidadesDeMedidaComponent } from './catalogos/unidades-de-medida/lista-unidades-de-medida/lista-unidades-de-medida.component';
import { AgregarUnidadesDeMedidaComponent } from './catalogos/unidades-de-medida/agregar-unidades-de-medida/agregar-unidades-de-medida.component';
import { DetalleUnidadesDeMedidaComponent } from './catalogos/unidades-de-medida/detalle-unidades-de-medida/detalle-unidades-de-medida.component';
import { EditarUnidadesDeMedidaComponent } from './catalogos/unidades-de-medida/editar-unidades-de-medida/editar-unidades-de-medida.component';
import { EliminarUnidadesDeMedidaComponent } from './catalogos/unidades-de-medida/eliminar-unidades-de-medida/eliminar-unidades-de-medida.component';
import { AgregarCategoriaComponent } from './catalogos/categorias/agregar-categoria/agregar-categoria.component';
import { DetalleCategoriaComponent } from './catalogos/categorias/detalle-categoria/detalle-categoria.component';
import { EditarCategoriaComponent } from './catalogos/categorias/editar-categoria/editar-categoria.component';
import { EliminarCategoriaComponent } from './catalogos/categorias/eliminar-categoria/eliminar-categoria.component';
import { ListaCategoriasComponent } from './catalogos/categorias/lista-categorias/lista-categorias.component';
import { ListaSubcategoriasComponent } from './catalogos/subcategorias/lista-subcategorias/lista-subcategorias.component';
import { AgregarSubcategoriaComponent } from './catalogos/subcategorias/agregar-subcategoria/agregar-subcategoria.component';
import { DetalleSubcategoriaComponent } from './catalogos/subcategorias/detalle-subcategoria/detalle-subcategoria.component';
import { EditarSubcategoriaComponent } from './catalogos/subcategorias/editar-subcategoria/editar-subcategoria.component';
import { EliminarSubcategoriaComponent } from './catalogos/subcategorias/eliminar-subcategoria/eliminar-subcategoria.component';
import { ListaArticulosInactivosComponent } from './catalogos/articulos/lista-articulos-inactivos/lista-articulos-inactivos.component';
import { AgregarConceptoComponent } from './catalogos/conceptos/agregar-concepto/agregar-concepto.component';
import { DetalleConceptoComponent } from './catalogos/conceptos/detalle-concepto/detalle-concepto.component';
import { EditarConceptoComponent } from './catalogos/conceptos/editar-concepto/editar-concepto.component';
import { EliminarConceptoComponent } from './catalogos/conceptos/eliminar-concepto/eliminar-concepto.component';
import { ListaConceptosComponent } from './catalogos/conceptos/lista-conceptos/lista-conceptos.component';
import { PanelInventariosComponent } from './inventarios/panel-inventarios/panel-inventarios.component';
import { EntradasComponent } from './inventarios/movimientos/entradas/entradas.component';
import { SalidasComponent } from './inventarios/movimientos/salidas/salidas.component';
import { TraspasosComponent } from './inventarios/movimientos/traspasos/traspasos.component';
import { EnEsperaComponent } from './inventarios/movimientos/en-espera/en-espera.component';
import { ArchivoDeAvanceComponent } from './inventarios/movimientos/archivo-de-avance/archivo-de-avance.component';
import { RealComponent } from './inventarios/conteos/real/real.component';
import { PorEscanerComponent } from './inventarios/conteos/por-escaner/por-escaner.component';
import { ImportarArchivoComponent } from './inventarios/conteos/importar-archivo/importar-archivo.component';
import { ModificarConteoFisicoComponent } from './inventarios/conteos/modificar-conteo-fisico/modificar-conteo-fisico.component';
import { MensualComponent } from './inventarios/cierre/mensual/mensual.component';
import { CancelacionComponent } from './inventarios/cierre/cancelacion/cancelacion.component';
import { ListaMermasComponent } from './inventarios/mermas/lista-mermas/lista-mermas.component';
import { DetalleMermaComponent } from './inventarios/mermas/detalle-merma/detalle-merma.component';
import { AgregarMermaComponent } from './inventarios/mermas/agregar-merma/agregar-merma.component';
import { EliminarMermaComponent } from './inventarios/mermas/eliminar-merma/eliminar-merma.component';
import { EditarMermaComponent } from './inventarios/mermas/editar-merma/editar-merma.component';
import { ImportacionComponent } from './inventarios/costos/importacion/importacion.component';
import { ElementosDeMenuComponent } from './ventas/elementos-de-menu/elementos-de-menu.component';
import { CentrosDeConsumoComponent } from './ventas/centros-de-consumo/centros-de-consumo.component';
import { ListaElementosDeMenuComponent } from './ventas/elementos-de-menu/lista-elementos-de-menu/lista-elementos-de-menu.component';
import { AgregarElementoDeMenuComponent } from './ventas/elementos-de-menu/agregar-elemento-de-menu/agregar-elemento-de-menu.component';
import { DetalleElementoDeMenuComponent } from './ventas/elementos-de-menu/detalle-elemento-de-menu/detalle-elemento-de-menu.component';
import { EliminarElementoDeMenuComponent } from './ventas/elementos-de-menu/eliminar-elemento-de-menu/eliminar-elemento-de-menu.component';
import { EditarElementoDeMenuComponent } from './ventas/elementos-de-menu/editar-elemento-de-menu/editar-elemento-de-menu.component';
import { AgregarClienteComponent } from './ventas/eventos/clientes/agregar-cliente/agregar-cliente.component';
import { DetalleClienteComponent } from './ventas/eventos/clientes/detalle-cliente/detalle-cliente.component';
import { EditarClienteComponent } from './ventas/eventos/clientes/editar-cliente/editar-cliente.component';
import { EliminarClienteComponent } from './ventas/eventos/clientes/eliminar-cliente/eliminar-cliente.component';
import { ListaClientesComponent } from './ventas/eventos/clientes/lista-clientes/lista-clientes.component';
import { AgregarEventoComponent } from './ventas/eventos/agregar-evento/agregar-evento.component';
import { DetalleEventoComponent } from './ventas/eventos/detalle-evento/detalle-evento.component';
import { EditarEventoComponent } from './ventas/eventos/editar-evento/editar-evento.component';
import { EliminarEventoComponent } from './ventas/eventos/eliminar-evento/eliminar-evento.component';
import { ListaEventosComponent } from './ventas/eventos/lista-eventos/lista-eventos.component';
import { GenerarComponent } from './ventas/eventos/ordenes-de-compra/generar/generar.component';
import { AgregarTiempoComponent } from './ventas/eventos/tiempos/agregar-tiempo/agregar-tiempo.component';
import { DetalleTiempoComponent } from './ventas/eventos/tiempos/detalle-tiempo/detalle-tiempo.component';
import { EditarTiempoComponent } from './ventas/eventos/tiempos/editar-tiempo/editar-tiempo.component';
import { EliminarTiempoComponent } from './ventas/eventos/tiempos/eliminar-tiempo/eliminar-tiempo.component';
import { ListaTiemposComponent } from './ventas/eventos/tiempos/lista-tiempos/lista-tiempos.component';
import { AgregarLocalidadComponent } from './ventas/eventos/localidades/agregar-localidad/agregar-localidad.component';
import { EditarLocalidadComponent } from './ventas/eventos/localidades/editar-localidad/editar-localidad.component';
import { DetalleLocalidadComponent } from './ventas/eventos/localidades/detalle-localidad/detalle-localidad.component';
import { EliminarLocalidadComponent } from './ventas/eventos/localidades/eliminar-localidad/eliminar-localidad.component';
import { ListaLocalidadesComponent } from './ventas/eventos/localidades/lista-localidades/lista-localidades.component';
import { AgregarPersonalComponent } from './ventas/eventos/personal/agregar-personal/agregar-personal.component';
import { EditarPersonalComponent } from './ventas/eventos/personal/editar-personal/editar-personal.component';
import { EliminarPersonalComponent } from './ventas/eventos/personal/eliminar-personal/eliminar-personal.component';
import { DetallePersonalComponent } from './ventas/eventos/personal/detalle-personal/detalle-personal.component';
import { ListaPersonalComponent } from './ventas/eventos/personal/lista-personal/lista-personal.component';
import { ListaCategoriaComponent } from './ventas/eventos/personal/lista-categoria/lista-categoria.component';
import { AgregarPaqueteComponent } from './ventas/banquetes/agregar-paquete/agregar-paquete.component';
import { DetallePaqueteComponent } from './ventas/banquetes/detalle-paquete/detalle-paquete.component';
import { EditarPaqueteComponent } from './ventas/banquetes/editar-paquete/editar-paquete.component';
import { EliminarPaqueteComponent } from './ventas/banquetes/eliminar-paquete/eliminar-paquete.component';
import { ListaPaquetesComponent } from './ventas/banquetes/lista-paquetes/lista-paquetes.component';
import { CrearPedidoComponent } from './ventas/banquetes/crear-pedido/crear-pedido.component';
import { ProducirComponent } from './ventas/banquetes/pedidos/producir/producir.component';
import { EntregarComponent } from './ventas/banquetes/pedidos/entregar/entregar.component';
import { ConsumirComponent } from './ventas/elementos-de-menu/consumir/consumir.component';
import { ArticulosComponent } from './catalogos/articulos/articulos/articulos.component';
import { AgregarCategoriaPersonalComponent } from './ventas/eventos/personal/agregar-categoria/agregar-categoria.component';
import { EditarCategoriaPersonalComponent } from './ventas/eventos/personal/editar-categoria/editar-categoria.component';
import { DetalleCategoriaPersonalComponent } from './ventas/eventos/personal/detalle-categoria/detalle-categoria.component';
import { EliminarCategoriaPersonalComponent } from './ventas/eventos/personal/eliminar-categoria/eliminar-categoria.component';
import { RelacionarProveedorComponent } from './catalogos/articulos/relacionar-proveedor/relacionar-proveedor.component';
import { DetalleRelacionProveedorComponent } from './catalogos/articulos/detalle-relacion-proveedor/detalle-relacion-proveedor.component';
import { EliminarRelacionProveedorComponent } from './catalogos/articulos/eliminar-relacion-proveedor/eliminar-relacion-proveedor.component';
import { EditarRelacionProveedorComponent } from './catalogos/articulos/editar-relacion-proveedor/editar-relacion-proveedor.component';
import { EditarRelacionAlmacenComponent } from './catalogos/articulos/editar-relacion-almacen/editar-relacion-almacen.component';
import { EliminarRelacionAlmacenComponent } from './catalogos/articulos/eliminar-relacion-almacen/eliminar-relacion-almacen.component';
import { DetalleRelacionAlmacenComponent } from './catalogos/articulos/detalle-relacion-almacen/detalle-relacion-almacen.component';
import { RelacionarMarcasComponent } from './catalogos/articulos/relacionar-marcas/relacionar-marcas.component';
import { DetalleRelacionMarcaComponent } from './catalogos/articulos/detalle-relacion-marca/detalle-relacion-marca.component';
import { EliminarRelacionMarcaComponent } from './catalogos/articulos/eliminar-relacion-marca/eliminar-relacion-marca.component';
import { EditarRelacionMarcaComponent } from './catalogos/articulos/editar-relacion-marca/editar-relacion-marca.component';
import { EditarRelacionClasificacionComponent } from './catalogos/articulos/editar-relacion-clasificacion/editar-relacion-clasificacion.component';
import { EliminarRelacionClasificacionComponent } from './catalogos/articulos/eliminar-relacion-clasificacion/eliminar-relacion-clasificacion.component';
import { DetalleRelacionClasificacionComponent } from './catalogos/articulos/detalle-relacion-clasificacion/detalle-relacion-clasificacion.component';
import { RelacionarClasificacionComponent } from './catalogos/articulos/relacionar-clasificacion/relacionar-clasificacion.component';
import { RelacionarExistenciasComponent } from './catalogos/articulos/relacionar-existencias/relacionar-existencias.component';
import { RelacionarUmComponent } from './catalogos/articulos/relacionar-um/relacionar-um.component';
import { DetalleRelacionExistenciasComponent } from './catalogos/articulos/detalle-relacion-existencias/detalle-relacion-existencias.component';
import { DetalleRelacionUmComponent } from './catalogos/articulos/detalle-relacion-um/detalle-relacion-um.component';
import { EditarRelacionExistenciasComponent } from './catalogos/articulos/editar-relacion-existencias/editar-relacion-existencias.component';
import { EditarRelacionUmComponent } from './catalogos/articulos/editar-relacion-um/editar-relacion-um.component';
import { EliminarRelacionExistenciasComponent } from './catalogos/articulos/eliminar-relacion-existencias/eliminar-relacion-existencias.component';
import { EliminarRelacionUmComponent } from './catalogos/articulos/eliminar-relacion-um/eliminar-relacion-um.component';
import { InfoArticuloComponent } from './inventarios/info-articulo/info-articulo.component';
import { MovimientosComponent } from './inventarios/movimientos/movimientos.component';
import { PanelMovimientosComponent } from './inventarios/movimientos/panel-movimientos/panel-movimientos.component';
import { InventariosComponent } from './inventarios/inventarios.component';
import { EditarInfoArticuloComponent } from './inventarios/editar-info-articulo/editar-info-articulo.component';
import { ListaEntradasComponent } from './inventarios/movimientos/lista-entradas/lista-entradas.component';
import { EliminarInfoArticuloComponent } from './inventarios/eliminar-info-articulo/eliminar-info-articulo.component';
import { ConteosFisicosComponent } from './inventarios/conteos/conteos-fisicos/conteos-fisicos.component';
import { EditableComponent } from './inventarios/editable-component/editable-component.component';
import { ViewModeDirective } from './directives/view-mode.directive';
import { EditModeDirective } from './directives/edit-mode.directive';
import { FocusableDirective } from './directives/focusable.directive';
import { EditableOnEnterDirective } from './directives/edit-on-enter.directive';
import { LocacionesPorAlmacenComponent } from './inventarios/conteos/locaciones-por-almacen/locaciones-por-almacen.component';
import { DatePipe } from '@angular/common';
import { ListaLocacionesComponent } from './catalogos/locaciones/lista-locaciones/lista-locaciones.component';
import { AgregarLocacionComponent } from './catalogos/locaciones/agregar-locacion/agregar-locacion.component';
import { EditarLocacionComponent } from './catalogos/locaciones/editar-locacion/editar-locacion.component';
import { EliminarLocacionComponent } from './catalogos/locaciones/eliminar-locacion/eliminar-locacion.component';
import { DetalleLocacionComponent } from './catalogos/locaciones/detalle-locacion/detalle-locacion.component';
import { IngresoPorScannerComponent } from './inventarios/ingreso-por-scanner/ingreso-por-scanner.component';
import { ScannerDetectionModule } from 'ngx-scanner-detection';
import { ListaCentrosConsumoComponent } from './catalogos/centros-de-consumo/lista-centros-consumo/lista-centros-consumo.component';
import { AgregarCentroConsumoComponent } from './catalogos/centros-de-consumo/agregar-centro-consumo/agregar-centro-consumo.component';
import { EliminarCentroConsumoComponent } from './catalogos/centros-de-consumo/eliminar-centro-consumo/eliminar-centro-consumo.component';
import { EditarCentroConsumoComponent } from './catalogos/centros-de-consumo/editar-centro-consumo/editar-centro-consumo.component';
import { DetalleCentroConsumoComponent } from './catalogos/centros-de-consumo/detalle-centro-consumo/detalle-centro-consumo.component';
import { environment } from 'src/environments/environment';
import { ListaInterfazComponent } from './catalogos/articulos/lista-interfaz/lista-interfaz.component';
import { ImportarArticuloComponent } from './catalogos/articulos/importar-articulo/importar-articulo.component';
import { ListaMaestroComponent } from './catalogos/articulos/lista-maestro/lista-maestro.component';
import { EditarMaestroComponent } from './catalogos/articulos/editar-maestro/editar-maestro.component';
import { DetalleMaestroComponent } from './catalogos/articulos/detalle-maestro/detalle-maestro.component';
import { ListaSubrecetasComponent } from './ventas/recetas/lista-subrecetas/lista-subrecetas.component';
import { ListaRecetasComponent } from './ventas/recetas/lista-recetas/lista-recetas.component';
import { DetalleRecetaComponent } from './ventas/recetas/detalle-receta/detalle-receta.component';
import { CollectionBannerTenComponent } from './widgets/collection-banner/collection-banner.component';
import { AgregarMaestroComponent } from './catalogos/articulos/agregar-maestro/agregar-maestro.component';
import { DescargarArticuloComponent } from './catalogos/articulos/descargar-articulo/descargar-articulo.component';
import { ArticulosLocacionesComponent } from './catalogos/articulos/articulos-locaciones/articulos-locaciones.component';
import { AgregarArticuloLocacionComponent } from './catalogos/articulos/agregar-articulo-locacion/agregar-articulo-locacion.component';
import { EditarArticuloLocacionComponent } from './catalogos/articulos/editar-articulo-locacion/editar-articulo-locacion.component';
import { EliminarArticuloLocacionComponent } from './catalogos/articulos/eliminar-articulo-locacion/eliminar-articulo-locacion.component';
import { DetalleArticuloLocacionComponent } from './catalogos/articulos/detalle-articulo-locacion/detalle-articulo-locacion.component';
import { LocacionesArticulosComponent } from './catalogos/locaciones/locaciones-articulos/locaciones-articulos.component';
import { LocacionesArticulosListaComponent } from './catalogos/locaciones/locaciones-articulos-lista/locaciones-articulos-lista.component';
import { AgregarLocacionesArticulosComponent } from './catalogos/locaciones/agregar-locaciones-articulos/agregar-locaciones-articulos.component';
import { ListaMovimientosComponent } from './inventarios/movimientos/lista-movimientos/lista-movimientos.component';
import { ListaComprasComponent } from './inventarios/compras/lista-compras/lista-compras.component';
import { RazonesSocialesComponent } from './catalogos/proveedores/razones-sociales/razones-sociales.component';
import { ProveedoresComponent } from './catalogos/proveedores/proveedores/proveedores.component';
import { AgregarRazonSocialComponent } from './catalogos/proveedores/agregar-razon-social/agregar-razon-social.component';
import { EditarRazonSocialComponent } from './catalogos/proveedores/editar-razon-social/editar-razon-social.component';
import { EliminarRazonSocialComponent } from './catalogos/proveedores/eliminar-razon-social/eliminar-razon-social.component';
import { DetalleRazonSocialComponent } from './catalogos/proveedores/detalle-razon-social/detalle-razon-social.component';
import { ComprasComponent } from './inventarios/compras/compras/compras.component';
import { AgregarCompraComponent } from './inventarios/compras/agregar-compra/agregar-compra.component';
import { EditarCompraComponent } from './inventarios/compras/editar-compra/editar-compra.component';
import { EliminarCompraComponent } from './inventarios/compras/eliminar-compra/eliminar-compra.component';
import { DetalleCompraComponent } from './inventarios/compras/detalle-compra/detalle-compra.component';
import { AsignarArticulosComponent } from './inventarios/movimientos/asignar-articulos/asignar-articulos.component';
import { AgreagrArticuloAsignacionComponent } from './inventarios/movimientos/agreagr-articulo-asignacion/agreagr-articulo-asignacion.component';
import { EditarArticuloAsignacionComponent } from './inventarios/movimientos/editar-articulo-asignacion/editar-articulo-asignacion.component';
import { EliminarArticuloAsignacionComponent } from './inventarios/movimientos/eliminar-articulo-asignacion/eliminar-articulo-asignacion.component';
import { LocacionesCentrosConsumoComponent } from './catalogos/locaciones/locaciones-centros-consumo/locaciones-centros-consumo.component';
import { ConfirmationDialogComponent } from './shared/confirmation-dialog/confirmation-dialog.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmationDialogService } from './shared/confirmation-dialog.service';
import { ArticulosProveedoresComponent } from './catalogos/articulos/articulos-proveedores/articulos-proveedores.component';
import { AgregarArticulosProveedoresComponent } from './catalogos/articulos/agregar-articulos-proveedores/agregar-articulos-proveedores.component';
import { EliminarArticulosProveedoresComponent } from './catalogos/articulos/eliminar-articulos-proveedores/eliminar-articulos-proveedores.component';
import { ArticulosLocacionesCompraComponent } from './inventarios/compras/articulos-locaciones-compra/articulos-locaciones-compra.component';
import { CentrosLocacionesComponent } from './catalogos/centros-de-consumo/centros-locaciones/centros-locaciones.component';
import { AgregarCentrosLocacionesComponent } from './catalogos/centros-de-consumo/agregar-centros-locaciones/agregar-centros-locaciones.component';
import { DetalleMovimientoComponent } from './inventarios/movimientos/detalle-movimiento/detalle-movimiento.component';
import { MovimientoSimpleComponent } from './catalogos/locaciones/movimiento-simple/movimiento-simple.component';
import { MovimientoCompuestoComponent } from './catalogos/locaciones/movimiento-compuesto/movimiento-compuesto.component';
// AoT requires an exported function for factories
export function HttpLoaderFactory(http: HttpClient) {
   return new TranslateHttpLoader(http, "./assets/i18n/", ".json");
}

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    DemoComponent,
    ListaAlmacenesComponent,
    AgregarAlmacenComponent,
    EditarAlmacenComponent,
    EliminarAlmacenComponent,
    DetalleAlmacenComponent,
    CatalogosComponent,
    HawkComponent,
    SistemaComponent,
    UsuariosComponent,
    DashboardComponent,
    //CollectionBannerTenComponent,
    PanelCatalogosComponent,
    CartWidgetComponent,
    SpinnerComponent,
    SubcartWidgetComponent,
    ListaProveedoresComponent,
    AgregarProveedorComponent,
    DetalleProveedorComponent,
    EditarProveedorComponent,
    EliminarProveedorComponent,
    ScafoldingListaComponent,
    ScafoldingAgregarComponent,
    ScafoldingDetalleComponent,
    ScafoldingEditarComponent,
    ScafoldingEliminarComponent,
    ListaArticulosComponent,
    AgregarArticuloComponent,
    DetalleArticuloComponent,
    EliminarArticuloComponent,
    EditarArticuloComponent,
    AgregarAlCarritoComponent,
    RecetaEnPreparacionComponent,
    SubrecetaEnPreparacionComponent,
    ListaRecetasComponent,
    DetalleRecetaComponent,
    DetalleSubrecetaComponent,
    AgregarRecetaComponent,
    AgregarSubrecetaComponent,
    EditarRecetaComponent,
    EditarSubrecetaComponent,
    EliminarSubrecetaComponent,
    EliminarRecetaComponent,
    VentasComponent,
    PanelVentasComponent,
    EliminarIngredienteComponent,
    EditarIngredienteComponent,
    DetalleIngredienteComponent,
    AgregarIngredienteComponent,
    LoginComponent,
    ListaUnidadesDeMedidaComponent,
    AgregarUnidadesDeMedidaComponent,
    DetalleUnidadesDeMedidaComponent,
    EditarUnidadesDeMedidaComponent,
    EliminarUnidadesDeMedidaComponent,
    AgregarCategoriaComponent,
    DetalleCategoriaComponent,
    EditarCategoriaComponent,
    EliminarCategoriaComponent,
    ListaCategoriasComponent,
    ListaSubcategoriasComponent,
    AgregarSubcategoriaComponent,
    DetalleSubcategoriaComponent,
    EditarSubcategoriaComponent,
    EliminarSubcategoriaComponent,
    ListaArticulosInactivosComponent,
    AgregarConceptoComponent,
    DetalleConceptoComponent,
    EditarConceptoComponent,
    EliminarConceptoComponent,
    ListaConceptosComponent,
    PanelInventariosComponent,
    EntradasComponent,
    SalidasComponent,
    TraspasosComponent,
    EnEsperaComponent,
    ArchivoDeAvanceComponent,
    RealComponent,
    PorEscanerComponent,
    ImportarArchivoComponent,
    ModificarConteoFisicoComponent,
    MensualComponent,
    CancelacionComponent,
    ListaMermasComponent,
    DetalleMermaComponent,
    AgregarMermaComponent,
    EliminarMermaComponent,
    EditarMermaComponent,
    ImportacionComponent,
    ElementosDeMenuComponent,
    CentrosDeConsumoComponent,
    ListaElementosDeMenuComponent,
    AgregarElementoDeMenuComponent,
    DetalleElementoDeMenuComponent,
    EliminarElementoDeMenuComponent,
    EditarElementoDeMenuComponent,
    AgregarClienteComponent,
    DetalleClienteComponent,
    EditarClienteComponent,
    EliminarClienteComponent,
    ListaClientesComponent,
    AgregarEventoComponent,
    DetalleEventoComponent,
    EditarEventoComponent,
    EliminarEventoComponent,
    ListaEventosComponent,
    GenerarComponent,
    AgregarTiempoComponent,
    DetalleTiempoComponent,
    EditarTiempoComponent,
    EliminarTiempoComponent,
    ListaTiemposComponent,
    AgregarLocalidadComponent,
    EditarLocalidadComponent,
    DetalleLocalidadComponent,
    EliminarLocalidadComponent,
    ListaLocalidadesComponent,
    AgregarPersonalComponent,
    EditarPersonalComponent,
    EliminarPersonalComponent,
    DetallePersonalComponent,
    ListaPersonalComponent,
    ListaCategoriaComponent,
    AgregarPaqueteComponent,
    DetallePaqueteComponent,
    EditarPaqueteComponent,
    EliminarPaqueteComponent,
    ListaPaquetesComponent,
    CrearPedidoComponent,
    ProducirComponent,
    EntregarComponent,
    ConsumirComponent,
    ArticulosComponent,
    AgregarCategoriaPersonalComponent,
    EditarCategoriaPersonalComponent,
    DetalleCategoriaPersonalComponent,
    EliminarCategoriaPersonalComponent,
    RelacionarProveedorComponent,
    DetalleRelacionProveedorComponent,
    EliminarRelacionProveedorComponent,
    EditarRelacionProveedorComponent,
    EditarRelacionAlmacenComponent,
    EliminarRelacionAlmacenComponent,
    DetalleRelacionAlmacenComponent,
    RelacionarMarcasComponent,
    DetalleRelacionMarcaComponent,
    EliminarRelacionMarcaComponent,
    EditarRelacionMarcaComponent,
    EditarRelacionClasificacionComponent,
    EliminarRelacionClasificacionComponent,
    DetalleRelacionClasificacionComponent,
    RelacionarClasificacionComponent,
    RelacionarExistenciasComponent,
    RelacionarUmComponent,
    DetalleRelacionExistenciasComponent,
    DetalleRelacionUmComponent,
    EditarRelacionExistenciasComponent,
    EditarRelacionUmComponent,
    EliminarRelacionExistenciasComponent,
    EliminarRelacionUmComponent,
    InfoArticuloComponent,
    MovimientosComponent,
    PanelMovimientosComponent,
    InventariosComponent,
    EditarInfoArticuloComponent,
    ListaEntradasComponent,
    EliminarInfoArticuloComponent,
    ConteosFisicosComponent,
    EditableComponent,
    ViewModeDirective,
    EditModeDirective,
    FocusableDirective,
    EditableOnEnterDirective,
    LocacionesPorAlmacenComponent,
    ListaLocacionesComponent,
    AgregarLocacionComponent,
    EditarLocacionComponent,
    EliminarLocacionComponent,
    DetalleLocacionComponent,
    IngresoPorScannerComponent,
    ListaCentrosConsumoComponent,
    AgregarCentroConsumoComponent,
    EliminarCentroConsumoComponent,
    EditarCentroConsumoComponent,
    DetalleCentroConsumoComponent,
    ListaInterfazComponent,
    ImportarArticuloComponent,
    ListaMaestroComponent,
    EditarMaestroComponent,
    DetalleMaestroComponent,
    ListaSubrecetasComponent,
    CollectionBannerTenComponent,
    AgregarMaestroComponent,
    DescargarArticuloComponent,
    ArticulosLocacionesComponent,
    AgregarArticuloLocacionComponent,
    EditarArticuloLocacionComponent,
    EliminarArticuloLocacionComponent,
    DetalleArticuloLocacionComponent,
    LocacionesArticulosComponent,
    LocacionesArticulosListaComponent,
    AgregarLocacionesArticulosComponent,
    ListaMovimientosComponent,
    ListaComprasComponent,
    RazonesSocialesComponent,
    ProveedoresComponent,
    AgregarRazonSocialComponent,
    EditarRazonSocialComponent,
    EliminarRazonSocialComponent,
    DetalleRazonSocialComponent,
    ComprasComponent,
    AgregarCompraComponent,
    EditarCompraComponent,
    EliminarCompraComponent,
    DetalleCompraComponent,
    AsignarArticulosComponent,
    AgreagrArticuloAsignacionComponent,
    EditarArticuloAsignacionComponent,
    EliminarArticuloAsignacionComponent,
    LocacionesCentrosConsumoComponent,
    ConfirmationDialogComponent,
    ArticulosProveedoresComponent,
    AgregarArticulosProveedoresComponent,
    EliminarArticulosProveedoresComponent,
    ArticulosLocacionesCompraComponent,
    CentrosLocacionesComponent,
    AgregarCentrosLocacionesComponent,
    DetalleMovimientoComponent,
    MovimientoSimpleComponent,
    MovimientoCompuestoComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    BrowserAnimationsModule,
    ShopModule,
    SharedModule,
    HttpClientModule,
    NgbModule.forRoot(),
    TranslateModule.forRoot({
        loader: {
            provide: TranslateLoader,
            useFactory: HttpLoaderFactory,
            deps: [HttpClient]
        }
    }),
    ToastrModule.forRoot({
      timeOut: 2000,
      progressBar: false,
      enableHtml: true,
    }),
    RouterModule.forRoot(rootRouterConfig, { useHash: true, anchorScrolling: 'enabled', scrollPositionRestoration: 'enabled' }),
    FormsModule,
    ReactiveFormsModule,
    MatAutocompleteModule,
    MatTabsModule,
    MatCardModule,
    MatDialogModule,
    MatProgressSpinnerModule,
    MatMenuModule,
    MatIconModule,
    MatToolbarModule,
    MatButtonModule, 
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatSortModule,
    MatTableModule,
    MatPaginatorModule,
    MatGridListModule,
    MatRadioModule,
    MatCheckboxModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSnackBarModule,
    MatChipsModule,
    MatExpansionModule,
    ScannerDetectionModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule
  ],
  exports:[
    AgregarAlmacenComponent,
    EditarAlmacenComponent,
    EliminarAlmacenComponent,
    DetalleAlmacenComponent,
    AgregarCategoriaComponent
  ],
  providers: [DatePipe,ConfirmationDialogService],
  bootstrap: [AppComponent],
  entryComponents:[
    AgregarAlmacenComponent,
    EditarAlmacenComponent,
    EliminarAlmacenComponent,
    DetalleAlmacenComponent,
    AgregarProveedorComponent,
    EditarProveedorComponent,
    EliminarProveedorComponent,
    DetalleProveedorComponent,
    AgregarAlCarritoComponent,
    AgregarIngredienteComponent,
    DetalleIngredienteComponent,
    EditarIngredienteComponent,
    EliminarIngredienteComponent,
    DetalleArticuloComponent,
    EliminarArticuloComponent,
    AgregarCategoriaComponent,
    AgregarSubcategoriaComponent,
    EditarSubcategoriaComponent,
    EliminarSubcategoriaComponent,
    DetalleSubcategoriaComponent,
    EditarCategoriaComponent,
    EliminarCategoriaComponent,
    DetalleCategoriaComponent,
    AgregarUnidadesDeMedidaComponent,
    DetalleUnidadesDeMedidaComponent,
    EditarUnidadesDeMedidaComponent,
    EliminarUnidadesDeMedidaComponent,
    AgregarConceptoComponent,
    EditarConceptoComponent,
    EliminarConceptoComponent,
    DetalleConceptoComponent,
    AgregarEventoComponent,
    EditarEventoComponent,
    EliminarEventoComponent,
    DetalleEventoComponent,
    AgregarClienteComponent,
    EditarClienteComponent,
    DetalleClienteComponent,
    EliminarClienteComponent,
    AgregarPaqueteComponent,
    DetallePaqueteComponent,
    EditarPaqueteComponent,
    EliminarPaqueteComponent,
    AgregarElementoDeMenuComponent,
    EditarElementoDeMenuComponent,
    DetalleElementoDeMenuComponent,
    EliminarElementoDeMenuComponent,
    AgregarLocalidadComponent,
    EditarLocalidadComponent,
    EliminarLocalidadComponent,
    DetalleLocalidadComponent,
    AgregarCategoriaPersonalComponent,
    EditarCategoriaPersonalComponent,
    DetalleCategoriaPersonalComponent,
    EliminarCategoriaPersonalComponent,
    AgregarPersonalComponent,
    EditarPersonalComponent,
    EliminarPersonalComponent,
    DetallePersonalComponent,
    AgregarTiempoComponent,
    EditarTiempoComponent,
    EliminarTiempoComponent,
    DetalleTiempoComponent,
    RelacionarProveedorComponent,
    EditarRelacionProveedorComponent,
    EliminarRelacionProveedorComponent,
    DetalleRelacionProveedorComponent,
    EditarRelacionAlmacenComponent,
    DetalleRelacionAlmacenComponent,
    EliminarRelacionAlmacenComponent,
    RelacionarMarcasComponent,
    EditarRelacionMarcaComponent,
    EliminarRelacionMarcaComponent,
    DetalleRelacionMarcaComponent,
    RelacionarClasificacionComponent,
    EliminarRelacionClasificacionComponent,
    EditarRelacionClasificacionComponent,
    DetalleRelacionClasificacionComponent,
    RelacionarExistenciasComponent,
    EliminarRelacionExistenciasComponent,
    EditarRelacionExistenciasComponent,
    DetalleRelacionExistenciasComponent,
    RelacionarUmComponent,
    EditarRelacionUmComponent,
    EliminarRelacionUmComponent,
    DetalleRelacionUmComponent,
    InfoArticuloComponent,
    EditarInfoArticuloComponent,
    EliminarInfoArticuloComponent,
    ConteosFisicosComponent,
    AgregarLocacionComponent,
    DetalleLocacionComponent,
    EliminarLocacionComponent,
    EditarLocacionComponent,
    AgregarCentroConsumoComponent,
    EditarCentroConsumoComponent,
    EliminarCentroConsumoComponent,
    DetalleCentroConsumoComponent,
    AgregarArticuloLocacionComponent,
    EditarArticuloLocacionComponent,
    EliminarArticuloLocacionComponent,
    DetalleArticuloLocacionComponent,
    AgregarLocacionesArticulosComponent,
    AgregarRazonSocialComponent,
    EditarRazonSocialComponent,
    EliminarRazonSocialComponent,
    DetalleRazonSocialComponent,
    AgreagrArticuloAsignacionComponent,
    EditarArticuloAsignacionComponent,
    EliminarArticuloAsignacionComponent,
    ConfirmationDialogComponent,
    AgregarArticulosProveedoresComponent,
    EliminarArticulosProveedoresComponent,
    ArticulosLocacionesCompraComponent,
    AgregarCentrosLocacionesComponent,
    MovimientoSimpleComponent
    ]
})
export class AppModule { }
