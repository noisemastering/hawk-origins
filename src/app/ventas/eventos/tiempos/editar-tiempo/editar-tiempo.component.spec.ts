import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarTiempoComponent } from './editar-tiempo.component';

describe('EditarTiempoComponent', () => {
  let component: EditarTiempoComponent;
  let fixture: ComponentFixture<EditarTiempoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditarTiempoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditarTiempoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
