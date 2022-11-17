import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaArticulosInactivosComponent } from './lista-articulos-inactivos.component';

describe('ListaArticulosInactivosComponent', () => {
  let component: ListaArticulosInactivosComponent;
  let fixture: ComponentFixture<ListaArticulosInactivosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListaArticulosInactivosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListaArticulosInactivosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
