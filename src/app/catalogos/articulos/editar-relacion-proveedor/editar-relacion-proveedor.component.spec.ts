import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarRelacionProveedorComponent } from './editar-relacion-proveedor.component';

describe('EditarRelacionProveedorComponent', () => {
  let component: EditarRelacionProveedorComponent;
  let fixture: ComponentFixture<EditarRelacionProveedorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditarRelacionProveedorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditarRelacionProveedorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
