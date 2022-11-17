import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalleLocalidadComponent } from './detalle-localidad.component';

describe('DetalleLocalidadComponent', () => {
  let component: DetalleLocalidadComponent;
  let fixture: ComponentFixture<DetalleLocalidadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetalleLocalidadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetalleLocalidadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
