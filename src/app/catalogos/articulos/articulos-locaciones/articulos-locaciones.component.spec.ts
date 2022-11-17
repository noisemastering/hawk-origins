import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ArticulosLocacionesComponent } from './articulos-locaciones.component';

describe('ArticulosLocacionesComponent', () => {
  let component: ArticulosLocacionesComponent;
  let fixture: ComponentFixture<ArticulosLocacionesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ArticulosLocacionesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArticulosLocacionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
