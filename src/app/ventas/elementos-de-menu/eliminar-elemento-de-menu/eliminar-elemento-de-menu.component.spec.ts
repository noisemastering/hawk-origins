import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EliminarElementoDeMenuComponent } from './eliminar-elemento-de-menu.component';

describe('EliminarElementoDeMenuComponent', () => {
  let component: EliminarElementoDeMenuComponent;
  let fixture: ComponentFixture<EliminarElementoDeMenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EliminarElementoDeMenuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EliminarElementoDeMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
