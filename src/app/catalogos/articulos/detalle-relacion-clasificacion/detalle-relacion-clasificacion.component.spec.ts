import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalleRelacionClasificacionComponent } from './detalle-relacion-clasificacion.component';

describe('DetalleRelacionClasificacionComponent', () => {
  let component: DetalleRelacionClasificacionComponent;
  let fixture: ComponentFixture<DetalleRelacionClasificacionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetalleRelacionClasificacionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetalleRelacionClasificacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
