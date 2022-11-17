import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AgregarLocacionesArticulosComponent } from './agregar-locaciones-articulos.component';

describe('AgregarLocacionesArticulosComponent', () => {
  let component: AgregarLocacionesArticulosComponent;
  let fixture: ComponentFixture<AgregarLocacionesArticulosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AgregarLocacionesArticulosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AgregarLocacionesArticulosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
