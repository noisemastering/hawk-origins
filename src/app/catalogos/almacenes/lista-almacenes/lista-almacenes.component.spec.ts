import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaAlmacenesComponent } from './lista-almacenes.component';

describe('ListaAlmacenesComponent', () => {
  let component: ListaAlmacenesComponent;
  let fixture: ComponentFixture<ListaAlmacenesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListaAlmacenesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListaAlmacenesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
