import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AgregarMermaComponent } from './agregar-merma.component';

describe('AgregarMermaComponent', () => {
  let component: AgregarMermaComponent;
  let fixture: ComponentFixture<AgregarMermaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AgregarMermaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AgregarMermaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
