import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RelacionarProveedorComponent } from './relacionar-proveedor.component';

describe('RelacionarProveedorComponent', () => {
  let component: RelacionarProveedorComponent;
  let fixture: ComponentFixture<RelacionarProveedorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RelacionarProveedorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RelacionarProveedorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
