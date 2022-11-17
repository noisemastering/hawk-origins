import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LocacionesArticulosComponent } from './locaciones-articulos.component';

describe('LocacionesArticulosComponent', () => {
  let component: LocacionesArticulosComponent;
  let fixture: ComponentFixture<LocacionesArticulosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LocacionesArticulosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LocacionesArticulosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
