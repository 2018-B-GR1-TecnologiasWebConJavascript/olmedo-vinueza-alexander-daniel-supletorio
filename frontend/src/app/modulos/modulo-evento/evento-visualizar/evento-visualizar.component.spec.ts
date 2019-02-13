import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EventoVisualizarComponent } from './evento-visualizar.component';

describe('EventoVisualizarComponent', () => {
  let component: EventoVisualizarComponent;
  let fixture: ComponentFixture<EventoVisualizarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EventoVisualizarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EventoVisualizarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
