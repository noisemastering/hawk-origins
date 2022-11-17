import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EliminarMermaComponent } from './eliminar-merma.component';

describe('EliminarMermaComponent', () => {
  let component: EliminarMermaComponent;
  let fixture: ComponentFixture<EliminarMermaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EliminarMermaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EliminarMermaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
