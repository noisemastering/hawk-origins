import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EliminarRelacionAlmacenComponent } from './eliminar-relacion-almacen.component';

describe('EliminarRelacionAlmacenComponent', () => {
  let component: EliminarRelacionAlmacenComponent;
  let fixture: ComponentFixture<EliminarRelacionAlmacenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EliminarRelacionAlmacenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EliminarRelacionAlmacenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
