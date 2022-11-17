import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaSubrecetasComponent } from './lista-subrecetas.component';

describe('ListaSubrecetasComponent', () => {
  let component: ListaSubrecetasComponent;
  let fixture: ComponentFixture<ListaSubrecetasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListaSubrecetasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListaSubrecetasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
