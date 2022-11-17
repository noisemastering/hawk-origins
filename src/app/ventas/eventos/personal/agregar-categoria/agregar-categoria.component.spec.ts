import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AgregarCategoriaPersonalComponent } from './agregar-categoria.component';

describe('AgregarCategoriaComponent', () => {
  let component: AgregarCategoriaPersonalComponent;
  let fixture: ComponentFixture<AgregarCategoriaPersonalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AgregarCategoriaPersonalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AgregarCategoriaPersonalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
