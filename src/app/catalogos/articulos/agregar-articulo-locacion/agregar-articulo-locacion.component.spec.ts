import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AgregarArticuloLocacionComponent } from './agregar-articulo-locacion.component';

describe('AgregarArticuloLocacionComponent', () => {
  let component: AgregarArticuloLocacionComponent;
  let fixture: ComponentFixture<AgregarArticuloLocacionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AgregarArticuloLocacionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AgregarArticuloLocacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
