import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AgregarSubrecetaComponent } from './agregar-subreceta.component';

describe('AgregarSubrecetaComponent', () => {
  let component: AgregarSubrecetaComponent;
  let fixture: ComponentFixture<AgregarSubrecetaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AgregarSubrecetaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AgregarSubrecetaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
