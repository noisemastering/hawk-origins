import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProducirComponent } from './producir.component';

describe('ProducirComponent', () => {
  let component: ProducirComponent;
  let fixture: ComponentFixture<ProducirComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProducirComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProducirComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
