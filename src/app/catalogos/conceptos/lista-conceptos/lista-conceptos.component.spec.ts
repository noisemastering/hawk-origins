import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaConceptosComponent } from './lista-conceptos.component';

describe('ListaConceptosComponent', () => {
  let component: ListaConceptosComponent;
  let fixture: ComponentFixture<ListaConceptosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListaConceptosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListaConceptosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
