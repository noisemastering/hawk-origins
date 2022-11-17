import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarRelacionMarcaComponent } from './editar-relacion-marca.component';

describe('EditarRelacionMarcaComponent', () => {
  let component: EditarRelacionMarcaComponent;
  let fixture: ComponentFixture<EditarRelacionMarcaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditarRelacionMarcaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditarRelacionMarcaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
