import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModificarConteoFisicoComponent } from './modificar-conteo-fisico.component';

describe('ModificarConteoFisicoComponent', () => {
  let component: ModificarConteoFisicoComponent;
  let fixture: ComponentFixture<ModificarConteoFisicoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModificarConteoFisicoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModificarConteoFisicoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
