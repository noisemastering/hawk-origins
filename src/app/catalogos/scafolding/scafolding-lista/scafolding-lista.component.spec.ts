import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ScafoldingListaComponent } from './scafolding-lista.component';

describe('ScafoldingListaComponent', () => {
  let component: ScafoldingListaComponent;
  let fixture: ComponentFixture<ScafoldingListaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ScafoldingListaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScafoldingListaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
