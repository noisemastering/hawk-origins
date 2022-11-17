import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalleConceptoComponent } from './detalle-concepto.component';

describe('DetalleConceptoComponent', () => {
  let component: DetalleConceptoComponent;
  let fixture: ComponentFixture<DetalleConceptoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetalleConceptoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetalleConceptoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
