import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AgregarLocacionComponent } from './agregar-locacion.component';

describe('AgregarLocacionComponent', () => {
  let component: AgregarLocacionComponent;
  let fixture: ComponentFixture<AgregarLocacionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AgregarLocacionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AgregarLocacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
