import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalleRelacionExistenciasComponent } from './detalle-relacion-existencias.component';

describe('DetalleRelacionExistenciasComponent', () => {
  let component: DetalleRelacionExistenciasComponent;
  let fixture: ComponentFixture<DetalleRelacionExistenciasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetalleRelacionExistenciasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetalleRelacionExistenciasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
