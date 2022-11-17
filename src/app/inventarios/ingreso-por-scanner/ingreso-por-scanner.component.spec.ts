import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IngresoPorScannerComponent } from './ingreso-por-scanner.component';

describe('IngresoPorScannerComponent', () => {
  let component: IngresoPorScannerComponent;
  let fixture: ComponentFixture<IngresoPorScannerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IngresoPorScannerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IngresoPorScannerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
