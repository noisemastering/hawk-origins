import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsumirComponent } from './consumir.component';

describe('ConsumirComponent', () => {
  let component: ConsumirComponent;
  let fixture: ComponentFixture<ConsumirComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConsumirComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsumirComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
