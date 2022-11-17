import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalleMaestroComponent } from './detalle-maestro.component';

describe('DetalleMaestroComponent', () => {
  let component: DetalleMaestroComponent;
  let fixture: ComponentFixture<DetalleMaestroComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetalleMaestroComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetalleMaestroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
