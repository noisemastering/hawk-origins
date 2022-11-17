import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ScafoldingEditarComponent } from './scafolding-editar.component';

describe('ScafoldingEditarComponent', () => {
  let component: ScafoldingEditarComponent;
  let fixture: ComponentFixture<ScafoldingEditarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ScafoldingEditarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScafoldingEditarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
