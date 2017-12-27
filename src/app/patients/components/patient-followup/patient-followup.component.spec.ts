import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientFollowupComponent } from './patient-followup.component';

describe('PatientFollowupComponent', () => {
  let component: PatientFollowupComponent;
  let fixture: ComponentFixture<PatientFollowupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PatientFollowupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PatientFollowupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
