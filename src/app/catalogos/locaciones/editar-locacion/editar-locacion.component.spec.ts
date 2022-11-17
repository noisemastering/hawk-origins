import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarLocacionComponent } from './editar-locacion.component';

describe('EditarLocacionComponent', () => {
  let component: EditarLocacionComponent;
  let fixture: ComponentFixture<EditarLocacionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditarLocacionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditarLocacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
