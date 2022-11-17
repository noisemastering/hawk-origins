import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarConceptoComponent } from './editar-concepto.component';

describe('EditarConceptoComponent', () => {
  let component: EditarConceptoComponent;
  let fixture: ComponentFixture<EditarConceptoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditarConceptoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditarConceptoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
