import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaMaestroComponent } from './lista-maestro.component';

describe('ListaMaestroComponent', () => {
  let component: ListaMaestroComponent;
  let fixture: ComponentFixture<ListaMaestroComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListaMaestroComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListaMaestroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
