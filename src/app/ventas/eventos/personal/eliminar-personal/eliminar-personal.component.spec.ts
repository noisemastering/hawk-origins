import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EliminarPersonalComponent } from './eliminar-personal.component';

describe('EliminarPersonalComponent', () => {
  let component: EliminarPersonalComponent;
  let fixture: ComponentFixture<EliminarPersonalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EliminarPersonalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EliminarPersonalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
