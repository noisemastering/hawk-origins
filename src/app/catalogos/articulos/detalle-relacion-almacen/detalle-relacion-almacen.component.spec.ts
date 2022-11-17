import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalleRelacionAlmacenComponent } from './detalle-relacion-almacen.component';

describe('DetalleRelacionAlmacenComponent', () => {
  let component: DetalleRelacionAlmacenComponent;
  let fixture: ComponentFixture<DetalleRelacionAlmacenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetalleRelacionAlmacenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetalleRelacionAlmacenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
