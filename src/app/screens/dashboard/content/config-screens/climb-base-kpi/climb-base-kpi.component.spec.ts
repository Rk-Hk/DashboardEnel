import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClimbBaseKpiComponent } from './climb-base-kpi.component';

describe('ClimbBaseKpiComponent', () => {
  let component: ClimbBaseKpiComponent;
  let fixture: ComponentFixture<ClimbBaseKpiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClimbBaseKpiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClimbBaseKpiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
