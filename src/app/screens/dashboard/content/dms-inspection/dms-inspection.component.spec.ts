import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DmsInspectionComponent } from './dms-inspection.component';

describe('DmsInspectionComponent', () => {
  let component: DmsInspectionComponent;
  let fixture: ComponentFixture<DmsInspectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DmsInspectionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DmsInspectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
