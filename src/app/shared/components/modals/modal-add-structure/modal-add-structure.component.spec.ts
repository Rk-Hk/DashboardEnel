import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalAddStructureComponent } from './modal-add-structure.component';

describe('ModalAddStructureComponent', () => {
  let component: ModalAddStructureComponent;
  let fixture: ComponentFixture<ModalAddStructureComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalAddStructureComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalAddStructureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
