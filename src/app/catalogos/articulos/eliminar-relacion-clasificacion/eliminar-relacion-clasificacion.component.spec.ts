import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EliminarRelacionClasificacionComponent } from './eliminar-relacion-clasificacion.component';

describe('EliminarRelacionClasificacionComponent', () => {
  let component: EliminarRelacionClasificacionComponent;
  let fixture: ComponentFixture<EliminarRelacionClasificacionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EliminarRelacionClasificacionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EliminarRelacionClasificacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
