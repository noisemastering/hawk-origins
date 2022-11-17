import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalleSubcategoriaComponent } from './detalle-subcategoria.component';

describe('DetalleSubcategoriaComponent', () => {
  let component: DetalleSubcategoriaComponent;
  let fixture: ComponentFixture<DetalleSubcategoriaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetalleSubcategoriaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetalleSubcategoriaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
