import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaUnidadesDeMedidaComponent } from './lista-unidades-de-medida.component';

describe('ListaUnidadesDeMedidaComponent', () => {
  let component: ListaUnidadesDeMedidaComponent;
  let fixture: ComponentFixture<ListaUnidadesDeMedidaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListaUnidadesDeMedidaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListaUnidadesDeMedidaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
