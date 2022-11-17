import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AgregarTiempoComponent } from './agregar-tiempo.component';

describe('AgregarTiempoComponent', () => {
  let component: AgregarTiempoComponent;
  let fixture: ComponentFixture<AgregarTiempoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AgregarTiempoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AgregarTiempoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
