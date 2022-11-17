import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RelacionarExistenciasComponent } from './relacionar-existencias.component';

describe('RelacionarExistenciasComponent', () => {
  let component: RelacionarExistenciasComponent;
  let fixture: ComponentFixture<RelacionarExistenciasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RelacionarExistenciasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RelacionarExistenciasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
