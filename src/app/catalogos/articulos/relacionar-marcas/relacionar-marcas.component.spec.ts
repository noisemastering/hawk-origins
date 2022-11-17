import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RelacionarMarcasComponent } from './relacionar-marcas.component';

describe('RelacionarMarcasComponent', () => {
  let component: RelacionarMarcasComponent;
  let fixture: ComponentFixture<RelacionarMarcasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RelacionarMarcasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RelacionarMarcasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
