import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarRelacionAlmacenComponent } from './editar-relacion-almacen.component';

describe('EditarRelacionAlmacenComponent', () => {
  let component: EditarRelacionAlmacenComponent;
  let fixture: ComponentFixture<EditarRelacionAlmacenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditarRelacionAlmacenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditarRelacionAlmacenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
