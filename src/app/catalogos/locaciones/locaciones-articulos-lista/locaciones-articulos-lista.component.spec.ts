import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LocacionesArticulosListaComponent } from './locaciones-articulos-lista.component';

describe('LocacionesArticulosListaComponent', () => {
  let component: LocacionesArticulosListaComponent;
  let fixture: ComponentFixture<LocacionesArticulosListaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LocacionesArticulosListaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LocacionesArticulosListaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
