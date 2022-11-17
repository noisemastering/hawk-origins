import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalleSubrecetaComponent } from './detalle-subreceta.component';

describe('DetalleSubrecetaComponent', () => {
  let component: DetalleSubrecetaComponent;
  let fixture: ComponentFixture<DetalleSubrecetaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetalleSubrecetaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetalleSubrecetaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
