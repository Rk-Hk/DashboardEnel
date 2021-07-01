import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CardDashboardKpiComponent } from './card-dashboard-kpi.component';

describe('CardDashboardKpiComponent', () => {
  let component: CardDashboardKpiComponent;
  let fixture: ComponentFixture<CardDashboardKpiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CardDashboardKpiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CardDashboardKpiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
