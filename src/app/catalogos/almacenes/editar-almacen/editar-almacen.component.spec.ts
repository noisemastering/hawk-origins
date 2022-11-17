import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarAlmacenComponent } from './editar-almacen.component';

describe('EditarAlmacenComponent', () => {
  let component: EditarAlmacenComponent;
  let fixture: ComponentFixture<EditarAlmacenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditarAlmacenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditarAlmacenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
