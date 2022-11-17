import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EliminarRelacionProveedorComponent } from './eliminar-relacion-proveedor.component';

describe('EliminarRelacionProveedorComponent', () => {
  let component: EliminarRelacionProveedorComponent;
  let fixture: ComponentFixture<EliminarRelacionProveedorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EliminarRelacionProveedorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EliminarRelacionProveedorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
