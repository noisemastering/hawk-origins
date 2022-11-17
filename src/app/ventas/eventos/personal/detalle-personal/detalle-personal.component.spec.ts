import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetallePersonalComponent } from './detalle-personal.component';

describe('DetallePersonalComponent', () => {
  let component: DetallePersonalComponent;
  let fixture: ComponentFixture<DetallePersonalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetallePersonalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetallePersonalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
