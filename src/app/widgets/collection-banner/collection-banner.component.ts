import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-collection-banner-ten',
  templateUrl: './collection-banner.component.html',
  styleUrls: ['./collection-banner.component.scss']
})
export class CollectionBannerTenComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  // Collection banner
  public categoryOne = [{
    image: 'assets/images/dashboard/catalogos.jpg',
    title: 'Catálogos',
    link: '/hawk/catalogos'
  }, 
  {
    image: 'assets/images/dashboard/ventas.jpg',
    title: 'Ventas',
    link: '/home/left-sidebar/collection/pets'
  },
  {
    image: 'assets/images/dashboard/compras.jpg',
    title: 'Compras',
    link: '/home/left-sidebar/collection/pets'
  }]

  public categoryTwo = [{
    image: 'assets/images/dashboard/reportes.jpg',
    title: 'Reportes',
    link: '/home/left-sidebar/collection/pets'
  },
  {
    image: 'assets/images/dashboard/sistema.jpg',
    title: 'Sistema',
    link: '/home/left-sidebar/collection/pets'
  },
  {
    image: 'assets/images/dashboard/perfil.jpg',
    title: 'Mi perfil',
    link: '/home/left-sidebar/collection/pets'
  }]

  

}
