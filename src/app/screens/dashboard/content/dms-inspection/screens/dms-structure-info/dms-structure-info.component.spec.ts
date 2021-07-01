import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DmsStructureInfoComponent } from './dms-structure-info.component';

describe('DmsStructureInfoComponent', () => {
  let component: DmsStructureInfoComponent;
  let fixture: ComponentFixture<DmsStructureInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DmsStructureInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DmsStructureInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
