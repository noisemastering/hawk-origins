import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalleElementoDeMenuComponent } from './detalle-elemento-de-menu.component';

describe('DetalleElementoDeMenuComponent', () => {
  let component: DetalleElementoDeMenuComponent;
  let fixture: ComponentFixture<DetalleElementoDeMenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetalleElementoDeMenuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetalleElementoDeMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
