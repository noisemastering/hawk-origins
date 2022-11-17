import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaMermasComponent } from './lista-mermas.component';

describe('ListaMermasComponent', () => {
  let component: ListaMermasComponent;
  let fixture: ComponentFixture<ListaMermasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListaMermasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListaMermasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
