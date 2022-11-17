import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EliminarSubrecetaComponent } from './eliminar-subreceta.component';

describe('EliminarSubrecetaComponent', () => {
  let component: EliminarSubrecetaComponent;
  let fixture: ComponentFixture<EliminarSubrecetaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EliminarSubrecetaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EliminarSubrecetaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
