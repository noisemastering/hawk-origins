import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarRelacionUmComponent } from './editar-relacion-um.component';

describe('EditarRelacionUmComponent', () => {
  let component: EditarRelacionUmComponent;
  let fixture: ComponentFixture<EditarRelacionUmComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditarRelacionUmComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditarRelacionUmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
