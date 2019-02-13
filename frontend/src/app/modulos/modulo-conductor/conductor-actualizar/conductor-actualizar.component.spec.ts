import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConductorActualizarComponent } from './conductor-actualizar.component';

describe('ConductorActualizarComponent', () => {
  let component: ConductorActualizarComponent;
  let fixture: ComponentFixture<ConductorActualizarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConductorActualizarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConductorActualizarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
