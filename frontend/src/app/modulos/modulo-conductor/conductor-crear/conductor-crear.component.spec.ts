import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConductorCrearComponent } from './conductor-crear.component';

describe('ConductorCrearComponent', () => {
  let component: ConductorCrearComponent;
  let fixture: ComponentFixture<ConductorCrearComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConductorCrearComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConductorCrearComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
