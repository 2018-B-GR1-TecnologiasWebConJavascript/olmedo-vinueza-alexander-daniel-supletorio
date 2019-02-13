import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConductorVisualizarComponent } from './conductor-visualizar.component';

describe('ConductorVisualizarComponent', () => {
  let component: ConductorVisualizarComponent;
  let fixture: ComponentFixture<ConductorVisualizarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConductorVisualizarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConductorVisualizarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
