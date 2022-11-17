import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CentrosDeConsumoComponent } from './centros-de-consumo.component';

describe('CentrosDeConsumoComponent', () => {
  let component: CentrosDeConsumoComponent;
  let fixture: ComponentFixture<CentrosDeConsumoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CentrosDeConsumoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CentrosDeConsumoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
