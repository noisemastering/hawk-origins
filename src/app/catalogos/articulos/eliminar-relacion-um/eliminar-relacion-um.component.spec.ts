import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EliminarRelacionUmComponent } from './eliminar-relacion-um.component';

describe('EliminarRelacionUmComponent', () => {
  let component: EliminarRelacionUmComponent;
  let fixture: ComponentFixture<EliminarRelacionUmComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EliminarRelacionUmComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EliminarRelacionUmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
