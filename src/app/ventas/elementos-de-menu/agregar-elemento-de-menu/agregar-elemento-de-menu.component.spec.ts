import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AgregarElementoDeMenuComponent } from './agregar-elemento-de-menu.component';

describe('AgregarElementoDeMenuComponent', () => {
  let component: AgregarElementoDeMenuComponent;
  let fixture: ComponentFixture<AgregarElementoDeMenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AgregarElementoDeMenuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AgregarElementoDeMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
