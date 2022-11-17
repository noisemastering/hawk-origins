import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubcartWidgetComponent } from './subcart-widget.component';

describe('SubcartWidgetComponent', () => {
  let component: SubcartWidgetComponent;
  let fixture: ComponentFixture<SubcartWidgetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubcartWidgetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubcartWidgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
