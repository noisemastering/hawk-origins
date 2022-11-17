import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EliminarIngredienteComponent } from './eliminar-ingrediente.component';

describe('EliminarIngredienteComponent', () => {
  let component: EliminarIngredienteComponent;
  let fixture: ComponentFixture<EliminarIngredienteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EliminarIngredienteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EliminarIngredienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
