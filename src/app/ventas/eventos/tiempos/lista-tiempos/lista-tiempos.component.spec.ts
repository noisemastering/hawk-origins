import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaTiemposComponent } from './lista-tiempos.component';

describe('ListaTiemposComponent', () => {
  let component: ListaTiemposComponent;
  let fixture: ComponentFixture<ListaTiemposComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListaTiemposComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListaTiemposComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
