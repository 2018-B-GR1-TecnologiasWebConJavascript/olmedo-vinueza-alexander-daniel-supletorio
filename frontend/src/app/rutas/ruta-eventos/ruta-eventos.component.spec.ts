import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RutaEventosComponent } from './ruta-eventos.component';

describe('RutaEventosComponent', () => {
  let component: RutaEventosComponent;
  let fixture: ComponentFixture<RutaEventosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RutaEventosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RutaEventosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
