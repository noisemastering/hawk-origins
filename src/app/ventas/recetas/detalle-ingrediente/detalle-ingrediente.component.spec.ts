import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalleIngredienteComponent } from './detalle-ingrediente.component';

describe('DetalleIngredienteComponent', () => {
  let component: DetalleIngredienteComponent;
  let fixture: ComponentFixture<DetalleIngredienteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetalleIngredienteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetalleIngredienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
