import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetallePaqueteComponent } from './detalle-paquete.component';

describe('DetallePaqueteComponent', () => {
  let component: DetallePaqueteComponent;
  let fixture: ComponentFixture<DetallePaqueteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetallePaqueteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetallePaqueteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
