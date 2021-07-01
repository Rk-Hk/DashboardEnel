import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalManageCompaniesComponent } from './modal-manage-companies.component';

describe('ModalManageCompaniesComponent', () => {
  let component: ModalManageCompaniesComponent;
  let fixture: ComponentFixture<ModalManageCompaniesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalManageCompaniesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalManageCompaniesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
