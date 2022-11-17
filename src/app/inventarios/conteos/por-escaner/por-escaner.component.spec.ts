import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PorEscanerComponent } from './por-escaner.component';

describe('PorEscanerComponent', () => {
  let component: PorEscanerComponent;
  let fixture: ComponentFixture<PorEscanerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PorEscanerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PorEscanerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
