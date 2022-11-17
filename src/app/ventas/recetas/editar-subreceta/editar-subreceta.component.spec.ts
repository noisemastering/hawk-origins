import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarSubrecetaComponent } from './editar-subreceta.component';

describe('EditarSubrecetaComponent', () => {
  let component: EditarSubrecetaComponent;
  let fixture: ComponentFixture<EditarSubrecetaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditarSubrecetaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditarSubrecetaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
