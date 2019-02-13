import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EventoVerComponent } from './evento-ver.component';

describe('EventoVerComponent', () => {
  let component: EventoVerComponent;
  let fixture: ComponentFixture<EventoVerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EventoVerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EventoVerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
