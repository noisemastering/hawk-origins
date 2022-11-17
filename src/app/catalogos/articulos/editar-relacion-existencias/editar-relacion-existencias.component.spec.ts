import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarRelacionExistenciasComponent } from './editar-relacion-existencias.component';

describe('EditarRelacionExistenciasComponent', () => {
  let component: EditarRelacionExistenciasComponent;
  let fixture: ComponentFixture<EditarRelacionExistenciasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditarRelacionExistenciasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditarRelacionExistenciasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
