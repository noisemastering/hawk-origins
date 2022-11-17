import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ScafoldingEliminarComponent } from './scafolding-eliminar.component';

describe('ScafoldingEliminarComponent', () => {
  let component: ScafoldingEliminarComponent;
  let fixture: ComponentFixture<ScafoldingEliminarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ScafoldingEliminarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScafoldingEliminarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
