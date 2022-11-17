import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaElementosDeMenuComponent } from './lista-elementos-de-menu.component';

describe('ListaElementosDeMenuComponent', () => {
  let component: ListaElementosDeMenuComponent;
  let fixture: ComponentFixture<ListaElementosDeMenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListaElementosDeMenuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListaElementosDeMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
