import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AgregarPaqueteComponent } from './agregar-paquete.component';

describe('AgregarPaqueteComponent', () => {
  let component: AgregarPaqueteComponent;
  let fixture: ComponentFixture<AgregarPaqueteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AgregarPaqueteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AgregarPaqueteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
