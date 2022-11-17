import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EliminarRelacionExistenciasComponent } from './eliminar-relacion-existencias.component';

describe('EliminarRelacionExistenciasComponent', () => {
  let component: EliminarRelacionExistenciasComponent;
  let fixture: ComponentFixture<EliminarRelacionExistenciasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EliminarRelacionExistenciasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EliminarRelacionExistenciasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
