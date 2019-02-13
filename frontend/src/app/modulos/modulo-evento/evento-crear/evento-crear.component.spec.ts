import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EventoCrearComponent } from './evento-crear.component';

describe('EventoCrearComponent', () => {
  let component: EventoCrearComponent;
  let fixture: ComponentFixture<EventoCrearComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EventoCrearComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EventoCrearComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
