import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EliminarLocacionComponent } from './eliminar-locacion.component';

describe('EliminarLocacionComponent', () => {
  let component: EliminarLocacionComponent;
  let fixture: ComponentFixture<EliminarLocacionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EliminarLocacionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EliminarLocacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
