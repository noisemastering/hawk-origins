import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DescargarArticuloComponent } from './descargar-articulo.component';

describe('DescargarArticuloComponent', () => {
  let component: DescargarArticuloComponent;
  let fixture: ComponentFixture<DescargarArticuloComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DescargarArticuloComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DescargarArticuloComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
