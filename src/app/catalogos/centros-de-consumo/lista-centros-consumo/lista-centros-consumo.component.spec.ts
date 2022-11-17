import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaCentrosConsumoComponent } from './lista-centros-consumo.component';

describe('ListaCentrosConsumoComponent', () => {
  let component: ListaCentrosConsumoComponent;
  let fixture: ComponentFixture<ListaCentrosConsumoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListaCentrosConsumoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListaCentrosConsumoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
