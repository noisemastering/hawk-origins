import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RelacionarUmComponent } from './relacionar-um.component';

describe('RelacionarUmComponent', () => {
  let component: RelacionarUmComponent;
  let fixture: ComponentFixture<RelacionarUmComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RelacionarUmComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RelacionarUmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
