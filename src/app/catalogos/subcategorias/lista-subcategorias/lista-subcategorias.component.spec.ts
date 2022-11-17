import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaSubcategoriasComponent } from './lista-subcategorias.component';

describe('ListaSubcategoriasComponent', () => {
  let component: ListaSubcategoriasComponent;
  let fixture: ComponentFixture<ListaSubcategoriasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListaSubcategoriasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListaSubcategoriasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
