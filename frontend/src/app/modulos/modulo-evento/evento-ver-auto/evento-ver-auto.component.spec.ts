import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EventoVerAutoComponent } from './evento-ver-auto.component';

describe('EventoVerAutoComponent', () => {
  let component: EventoVerAutoComponent;
  let fixture: ComponentFixture<EventoVerAutoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EventoVerAutoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EventoVerAutoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
