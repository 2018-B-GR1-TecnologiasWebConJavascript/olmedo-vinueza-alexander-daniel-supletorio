import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FacturaVisualizarComponent } from './factura-visualizar.component';

describe('FacturaVisualizarComponent', () => {
  let component: FacturaVisualizarComponent;
  let fixture: ComponentFixture<FacturaVisualizarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FacturaVisualizarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FacturaVisualizarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
