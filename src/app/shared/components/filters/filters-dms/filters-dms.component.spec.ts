import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FiltersDmsComponent } from './filters-dms.component';

describe('FiltersDmsComponent', () => {
  let component: FiltersDmsComponent;
  let fixture: ComponentFixture<FiltersDmsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FiltersDmsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FiltersDmsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
