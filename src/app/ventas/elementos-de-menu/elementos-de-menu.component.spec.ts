import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ElementosDeMenuComponent } from './elementos-de-menu.component';

describe('ElementosDeMenuComponent', () => {
  let component: ElementosDeMenuComponent;
  let fixture: ComponentFixture<ElementosDeMenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ElementosDeMenuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ElementosDeMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
