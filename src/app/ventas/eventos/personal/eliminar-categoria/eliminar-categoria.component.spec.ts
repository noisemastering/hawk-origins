import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EliminarCategoriaPersonalComponent } from './eliminar-categoria.component';

describe('EliminarCategoriaPersonalComponent', () => {
  let component: EliminarCategoriaPersonalComponent;
  let fixture: ComponentFixture<EliminarCategoriaPersonalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EliminarCategoriaPersonalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EliminarCategoriaPersonalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
