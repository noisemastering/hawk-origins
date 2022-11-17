import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaLocacionesComponent } from './lista-locaciones.component';

describe('ListaLocacionesComponent', () => {
  let component: ListaLocacionesComponent;
  let fixture: ComponentFixture<ListaLocacionesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListaLocacionesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListaLocacionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
