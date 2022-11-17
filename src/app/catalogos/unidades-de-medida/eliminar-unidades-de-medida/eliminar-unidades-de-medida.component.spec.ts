import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EliminarUnidadesDeMedidaComponent } from './eliminar-unidades-de-medida.component';

describe('EliminarUnidadesDeMedidaComponent', () => {
  let component: EliminarUnidadesDeMedidaComponent;
  let fixture: ComponentFixture<EliminarUnidadesDeMedidaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EliminarUnidadesDeMedidaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EliminarUnidadesDeMedidaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
