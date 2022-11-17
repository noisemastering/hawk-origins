import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EliminarCentroConsumoComponent } from './eliminar-centro-consumo.component';

describe('EliminarCentroConsumoComponent', () => {
  let component: EliminarCentroConsumoComponent;
  let fixture: ComponentFixture<EliminarCentroConsumoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EliminarCentroConsumoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EliminarCentroConsumoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
