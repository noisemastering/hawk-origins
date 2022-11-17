import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ScafoldingAgregarComponent } from './scafolding-agregar.component';

describe('ScafoldingAgregarComponent', () => {
  let component: ScafoldingAgregarComponent;
  let fixture: ComponentFixture<ScafoldingAgregarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ScafoldingAgregarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScafoldingAgregarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
