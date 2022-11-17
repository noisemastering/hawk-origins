import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PanelVentasComponent } from './panel-ventas.component';

describe('PanelVentasComponent', () => {
  let component: PanelVentasComponent;
  let fixture: ComponentFixture<PanelVentasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PanelVentasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PanelVentasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
