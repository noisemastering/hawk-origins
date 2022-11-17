import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalleRelacionProveedorComponent } from './detalle-relacion-proveedor.component';

describe('DetalleRelacionProveedorComponent', () => {
  let component: DetalleRelacionProveedorComponent;
  let fixture: ComponentFixture<DetalleRelacionProveedorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetalleRelacionProveedorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetalleRelacionProveedorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
