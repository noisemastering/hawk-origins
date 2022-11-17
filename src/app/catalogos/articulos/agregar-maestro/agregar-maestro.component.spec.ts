import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AgregarMaestroComponent } from './agregar-maestro.component';

describe('AgregarMaestroComponent', () => {
  let component: AgregarMaestroComponent;
  let fixture: ComponentFixture<AgregarMaestroComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AgregarMaestroComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AgregarMaestroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
