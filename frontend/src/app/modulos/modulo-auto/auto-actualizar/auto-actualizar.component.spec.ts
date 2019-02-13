import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AutoActualizarComponent } from './auto-actualizar.component';

describe('AutoActualizarComponent', () => {
  let component: AutoActualizarComponent;
  let fixture: ComponentFixture<AutoActualizarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AutoActualizarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AutoActualizarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
