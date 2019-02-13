import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AutoCrearComponent } from './auto-crear.component';

describe('AutoCrearComponent', () => {
  let component: AutoCrearComponent;
  let fixture: ComponentFixture<AutoCrearComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AutoCrearComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AutoCrearComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
