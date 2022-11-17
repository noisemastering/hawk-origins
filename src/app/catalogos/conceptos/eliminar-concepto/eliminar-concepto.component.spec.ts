import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EliminarConceptoComponent } from './eliminar-concepto.component';

describe('EliminarConceptoComponent', () => {
  let component: EliminarConceptoComponent;
  let fixture: ComponentFixture<EliminarConceptoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EliminarConceptoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EliminarConceptoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
