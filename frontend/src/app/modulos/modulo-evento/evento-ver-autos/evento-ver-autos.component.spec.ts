import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EventoVerAutosComponent } from './evento-ver-autos.component';

describe('EventoVerAutosComponent', () => {
  let component: EventoVerAutosComponent;
  let fixture: ComponentFixture<EventoVerAutosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EventoVerAutosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EventoVerAutosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
