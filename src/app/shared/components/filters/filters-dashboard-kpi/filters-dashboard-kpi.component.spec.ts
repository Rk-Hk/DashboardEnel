import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FiltersDashboardKpiComponent } from './filters-dashboard-kpi.component';

describe('FiltersDashboardKpiComponent', () => {
  let component: FiltersDashboardKpiComponent;
  let fixture: ComponentFixture<FiltersDashboardKpiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FiltersDashboardKpiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FiltersDashboardKpiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
