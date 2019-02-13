import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormConductorComponent } from './form-conductor.component';

describe('FormConductorComponent', () => {
  let component: FormConductorComponent;
  let fixture: ComponentFixture<FormConductorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormConductorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormConductorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
