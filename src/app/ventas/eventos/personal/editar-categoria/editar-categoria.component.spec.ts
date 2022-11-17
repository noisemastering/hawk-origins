import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarCategoriaPersonalComponent } from './editar-categoria.component';

describe('EditarCategoriaPersonalComponent', () => {
  let component: EditarCategoriaPersonalComponent;
  let fixture: ComponentFixture<EditarCategoriaPersonalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditarCategoriaPersonalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditarCategoriaPersonalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
