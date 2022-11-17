import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EliminarArticuloComponent } from './eliminar-articulo.component';

describe('EliminarArticuloComponent', () => {
  let component: EliminarArticuloComponent;
  let fixture: ComponentFixture<EliminarArticuloComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EliminarArticuloComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EliminarArticuloComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
