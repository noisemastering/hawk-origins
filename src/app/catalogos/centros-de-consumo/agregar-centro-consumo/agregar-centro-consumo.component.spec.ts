import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AgregarCentroConsumoComponent } from './agregar-centro-consumo.component';

describe('AgregarCentroConsumoComponent', () => {
  let component: AgregarCentroConsumoComponent;
  let fixture: ComponentFixture<AgregarCentroConsumoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AgregarCentroConsumoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AgregarCentroConsumoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
