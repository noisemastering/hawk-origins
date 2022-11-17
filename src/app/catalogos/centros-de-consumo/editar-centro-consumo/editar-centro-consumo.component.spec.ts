import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarCentroConsumoComponent } from './editar-centro-consumo.component';

describe('EditarCentroConsumoComponent', () => {
  let component: EditarCentroConsumoComponent;
  let fixture: ComponentFixture<EditarCentroConsumoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditarCentroConsumoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditarCentroConsumoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
