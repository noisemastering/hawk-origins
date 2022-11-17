import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalleRelacionUmComponent } from './detalle-relacion-um.component';

describe('DetalleRelacionUmComponent', () => {
  let component: DetalleRelacionUmComponent;
  let fixture: ComponentFixture<DetalleRelacionUmComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetalleRelacionUmComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetalleRelacionUmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
