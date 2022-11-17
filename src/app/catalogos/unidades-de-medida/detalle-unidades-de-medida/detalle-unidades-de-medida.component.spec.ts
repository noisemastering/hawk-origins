import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalleUnidadesDeMedidaComponent } from './detalle-unidades-de-medida.component';

describe('DetalleUnidadesDeMedidaComponent', () => {
  let component: DetalleUnidadesDeMedidaComponent;
  let fixture: ComponentFixture<DetalleUnidadesDeMedidaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetalleUnidadesDeMedidaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetalleUnidadesDeMedidaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
