import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarMermaComponent } from './editar-merma.component';

describe('EditarMermaComponent', () => {
  let component: EditarMermaComponent;
  let fixture: ComponentFixture<EditarMermaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditarMermaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditarMermaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
