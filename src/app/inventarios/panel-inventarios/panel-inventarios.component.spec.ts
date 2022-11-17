import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PanelInventariosComponent } from './panel-inventarios.component';

describe('PanelInventariosComponent', () => {
  let component: PanelInventariosComponent;
  let fixture: ComponentFixture<PanelInventariosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PanelInventariosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PanelInventariosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
