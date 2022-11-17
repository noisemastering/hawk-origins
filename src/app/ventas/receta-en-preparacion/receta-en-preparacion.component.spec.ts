import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecetaEnPreparacionComponent } from './receta-en-preparacion.component';

describe('RecetaEnPreparacionComponent', () => {
  let component: RecetaEnPreparacionComponent;
  let fixture: ComponentFixture<RecetaEnPreparacionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecetaEnPreparacionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecetaEnPreparacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
