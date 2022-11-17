import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ArchivoDeAvanceComponent } from './archivo-de-avance.component';

describe('ArchivoDeAvanceComponent', () => {
  let component: ArchivoDeAvanceComponent;
  let fixture: ComponentFixture<ArchivoDeAvanceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ArchivoDeAvanceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArchivoDeAvanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
