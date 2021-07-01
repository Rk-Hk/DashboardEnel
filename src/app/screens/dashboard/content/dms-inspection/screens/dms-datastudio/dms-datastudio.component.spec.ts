import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DmsDatastudioComponent } from './dms-datastudio.component';

describe('DmsDatastudioComponent', () => {
  let component: DmsDatastudioComponent;
  let fixture: ComponentFixture<DmsDatastudioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DmsDatastudioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DmsDatastudioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
