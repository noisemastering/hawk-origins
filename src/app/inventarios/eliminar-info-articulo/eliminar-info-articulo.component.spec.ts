import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EliminarInfoArticuloComponent } from './eliminar-info-articulo.component';

describe('EliminarInfoArticuloComponent', () => {
  let component: EliminarInfoArticuloComponent;
  let fixture: ComponentFixture<EliminarInfoArticuloComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EliminarInfoArticuloComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EliminarInfoArticuloComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
