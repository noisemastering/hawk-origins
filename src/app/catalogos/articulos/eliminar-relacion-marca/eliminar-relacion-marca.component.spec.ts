import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EliminarRelacionMarcaComponent } from './eliminar-relacion-marca.component';

describe('EliminarRelacionMarcaComponent', () => {
  let component: EliminarRelacionMarcaComponent;
  let fixture: ComponentFixture<EliminarRelacionMarcaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EliminarRelacionMarcaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EliminarRelacionMarcaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
