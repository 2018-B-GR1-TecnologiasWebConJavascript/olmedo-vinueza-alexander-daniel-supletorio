import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EventoActualizarComponent } from './evento-actualizar.component';

describe('EventoActualizarComponent', () => {
  let component: EventoActualizarComponent;
  let fixture: ComponentFixture<EventoActualizarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EventoActualizarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EventoActualizarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
