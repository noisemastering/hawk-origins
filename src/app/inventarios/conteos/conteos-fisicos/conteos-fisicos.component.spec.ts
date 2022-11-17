import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConteosFisicosComponent } from './conteos-fisicos.component';

describe('ConteosFisicosComponent', () => {
  let component: ConteosFisicosComponent;
  let fixture: ComponentFixture<ConteosFisicosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConteosFisicosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConteosFisicosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
