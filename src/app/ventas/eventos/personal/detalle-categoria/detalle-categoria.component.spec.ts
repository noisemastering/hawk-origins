import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalleCategoriaPersonalComponent } from './detalle-categoria.component';

describe('DetalleCategoriaPersonalComponent', () => {
  let component: DetalleCategoriaPersonalComponent;
  let fixture: ComponentFixture<DetalleCategoriaPersonalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetalleCategoriaPersonalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetalleCategoriaPersonalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
