import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarPaqueteComponent } from './editar-paquete.component';

describe('EditarPaqueteComponent', () => {
  let component: EditarPaqueteComponent;
  let fixture: ComponentFixture<EditarPaqueteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditarPaqueteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditarPaqueteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
