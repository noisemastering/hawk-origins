import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarArticuloLocacionComponent } from './editar-articulo-locacion.component';

describe('EditarArticuloLocacionComponent', () => {
  let component: EditarArticuloLocacionComponent;
  let fixture: ComponentFixture<EditarArticuloLocacionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditarArticuloLocacionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditarArticuloLocacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
