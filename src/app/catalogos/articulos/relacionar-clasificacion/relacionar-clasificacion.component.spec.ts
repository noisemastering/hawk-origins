import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RelacionarClasificacionComponent } from './relacionar-clasificacion.component';

describe('RelacionarClasificacionComponent', () => {
  let component: RelacionarClasificacionComponent;
  let fixture: ComponentFixture<RelacionarClasificacionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RelacionarClasificacionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RelacionarClasificacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
