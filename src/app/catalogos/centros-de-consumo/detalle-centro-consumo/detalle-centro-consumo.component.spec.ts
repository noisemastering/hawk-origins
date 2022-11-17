import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalleCentroConsumoComponent } from './detalle-centro-consumo.component';

describe('DetalleCentroConsumoComponent', () => {
  let component: DetalleCentroConsumoComponent;
  let fixture: ComponentFixture<DetalleCentroConsumoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetalleCentroConsumoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetalleCentroConsumoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
