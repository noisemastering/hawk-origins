import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EliminarArticuloLocacionComponent } from './eliminar-articulo-locacion.component';

describe('EliminarArticuloLocacionComponent', () => {
  let component: EliminarArticuloLocacionComponent;
  let fixture: ComponentFixture<EliminarArticuloLocacionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EliminarArticuloLocacionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EliminarArticuloLocacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
