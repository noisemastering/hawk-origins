import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EliminarTiempoComponent } from './eliminar-tiempo.component';

describe('EliminarTiempoComponent', () => {
  let component: EliminarTiempoComponent;
  let fixture: ComponentFixture<EliminarTiempoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EliminarTiempoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EliminarTiempoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
