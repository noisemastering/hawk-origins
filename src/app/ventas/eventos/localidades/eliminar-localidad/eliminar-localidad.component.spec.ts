import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EliminarLocalidadComponent } from './eliminar-localidad.component';

describe('EliminarLocalidadComponent', () => {
  let component: EliminarLocalidadComponent;
  let fixture: ComponentFixture<EliminarLocalidadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EliminarLocalidadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EliminarLocalidadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
