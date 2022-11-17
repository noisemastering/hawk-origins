import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalleRelacionMarcaComponent } from './detalle-relacion-marca.component';

describe('DetalleRelacionMarcaComponent', () => {
  let component: DetalleRelacionMarcaComponent;
  let fixture: ComponentFixture<DetalleRelacionMarcaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetalleRelacionMarcaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetalleRelacionMarcaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
