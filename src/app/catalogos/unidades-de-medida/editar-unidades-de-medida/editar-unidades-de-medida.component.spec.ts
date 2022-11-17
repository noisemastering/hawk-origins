import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarUnidadesDeMedidaComponent } from './editar-unidades-de-medida.component';

describe('EditarUnidadesDeMedidaComponent', () => {
  let component: EditarUnidadesDeMedidaComponent;
  let fixture: ComponentFixture<EditarUnidadesDeMedidaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditarUnidadesDeMedidaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditarUnidadesDeMedidaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
