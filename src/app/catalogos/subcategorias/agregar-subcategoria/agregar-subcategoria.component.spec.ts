import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AgregarSubcategoriaComponent } from './agregar-subcategoria.component';

describe('AgregarSubcategoriaComponent', () => {
  let component: AgregarSubcategoriaComponent;
  let fixture: ComponentFixture<AgregarSubcategoriaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AgregarSubcategoriaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AgregarSubcategoriaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
