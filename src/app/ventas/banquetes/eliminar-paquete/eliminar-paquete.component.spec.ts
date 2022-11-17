import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EliminarPaqueteComponent } from './eliminar-paquete.component';

describe('EliminarPaqueteComponent', () => {
  let component: EliminarPaqueteComponent;
  let fixture: ComponentFixture<EliminarPaqueteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EliminarPaqueteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EliminarPaqueteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
