import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarElementoDeMenuComponent } from './editar-elemento-de-menu.component';

describe('EditarElementoDeMenuComponent', () => {
  let component: EditarElementoDeMenuComponent;
  let fixture: ComponentFixture<EditarElementoDeMenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditarElementoDeMenuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditarElementoDeMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
