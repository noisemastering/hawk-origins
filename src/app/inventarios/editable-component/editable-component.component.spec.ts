import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditableComponentComponent } from './editable-component.component';

describe('EditableComponentComponent', () => {
  let component: EditableComponentComponent;
  let fixture: ComponentFixture<EditableComponentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditableComponentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditableComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
