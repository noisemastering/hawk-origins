import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalleLocacionComponent } from './detalle-locacion.component';

describe('DetalleLocacionComponent', () => {
  let component: DetalleLocacionComponent;
  let fixture: ComponentFixture<DetalleLocacionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetalleLocacionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetalleLocacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
