import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalleAlmacenComponent } from './detalle-almacen.component';

describe('DetalleAlmacenComponent', () => {
  let component: DetalleAlmacenComponent;
  let fixture: ComponentFixture<DetalleAlmacenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetalleAlmacenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetalleAlmacenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
