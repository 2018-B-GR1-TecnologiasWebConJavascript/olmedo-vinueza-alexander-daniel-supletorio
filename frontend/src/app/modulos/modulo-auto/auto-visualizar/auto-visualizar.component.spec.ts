import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AutoVisualizarComponent } from './auto-visualizar.component';

describe('AutoVisualizarComponent', () => {
  let component: AutoVisualizarComponent;
  let fixture: ComponentFixture<AutoVisualizarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AutoVisualizarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AutoVisualizarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
