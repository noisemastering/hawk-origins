import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarRelacionClasificacionComponent } from './editar-relacion-clasificacion.component';

describe('EditarRelacionClasificacionComponent', () => {
  let component: EditarRelacionClasificacionComponent;
  let fixture: ComponentFixture<EditarRelacionClasificacionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditarRelacionClasificacionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditarRelacionClasificacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
