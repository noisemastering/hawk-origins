import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalleCategoriaComponent } from './detalle-categoria.component';

describe('DetalleCategoriaComponent', () => {
  let component: DetalleCategoriaComponent;
  let fixture: ComponentFixture<DetalleCategoriaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetalleCategoriaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetalleCategoriaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
