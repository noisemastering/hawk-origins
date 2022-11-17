import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ScafoldingDetalleComponent } from './scafolding-detalle.component';

describe('ScafoldingDetalleComponent', () => {
  let component: ScafoldingDetalleComponent;
  let fixture: ComponentFixture<ScafoldingDetalleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ScafoldingDetalleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScafoldingDetalleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
