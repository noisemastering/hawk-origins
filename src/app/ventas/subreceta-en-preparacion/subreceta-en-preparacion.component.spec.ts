import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubrecetaEnPreparacionComponent } from './subreceta-en-preparacion.component';

describe('SubrecetaEnPreparacionComponent', () => {
  let component: SubrecetaEnPreparacionComponent;
  let fixture: ComponentFixture<SubrecetaEnPreparacionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubrecetaEnPreparacionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubrecetaEnPreparacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
