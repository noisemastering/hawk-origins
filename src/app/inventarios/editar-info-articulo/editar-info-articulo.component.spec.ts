import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarInfoArticuloComponent } from './editar-info-articulo.component';

describe('EditarInfoArticuloComponent', () => {
  let component: EditarInfoArticuloComponent;
  let fixture: ComponentFixture<EditarInfoArticuloComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditarInfoArticuloComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditarInfoArticuloComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
