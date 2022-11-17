import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalleTiempoComponent } from './detalle-tiempo.component';

describe('DetalleTiempoComponent', () => {
  let component: DetalleTiempoComponent;
  let fixture: ComponentFixture<DetalleTiempoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetalleTiempoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetalleTiempoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
