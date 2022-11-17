import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalleArticuloLocacionComponent } from './detalle-articulo-locacion.component';

describe('DetalleArticuloLocacionComponent', () => {
  let component: DetalleArticuloLocacionComponent;
  let fixture: ComponentFixture<DetalleArticuloLocacionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetalleArticuloLocacionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetalleArticuloLocacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
