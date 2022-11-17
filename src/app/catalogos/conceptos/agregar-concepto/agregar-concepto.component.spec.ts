import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AgregarConceptoComponent } from './agregar-concepto.component';

describe('AgregarConceptoComponent', () => {
  let component: AgregarConceptoComponent;
  let fixture: ComponentFixture<AgregarConceptoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AgregarConceptoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AgregarConceptoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
