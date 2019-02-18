import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EventoAgregarHijoComponent } from './evento-agregar-hijo.component';

describe('EventoAgregarHijoComponent', () => {
  let component: EventoAgregarHijoComponent;
  let fixture: ComponentFixture<EventoAgregarHijoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EventoAgregarHijoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EventoAgregarHijoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
