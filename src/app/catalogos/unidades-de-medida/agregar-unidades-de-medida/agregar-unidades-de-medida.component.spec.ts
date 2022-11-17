import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AgregarUnidadesDeMedidaComponent } from './agregar-unidades-de-medida.component';

describe('AgregarUnidadesDeMedidaComponent', () => {
  let component: AgregarUnidadesDeMedidaComponent;
  let fixture: ComponentFixture<AgregarUnidadesDeMedidaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AgregarUnidadesDeMedidaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AgregarUnidadesDeMedidaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
