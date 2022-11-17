import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LocacionesPorAlmacenComponent } from './locaciones-por-almacen.component';

describe('LocacionesPorAlmacenComponent', () => {
  let component: LocacionesPorAlmacenComponent;
  let fixture: ComponentFixture<LocacionesPorAlmacenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LocacionesPorAlmacenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LocacionesPorAlmacenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
