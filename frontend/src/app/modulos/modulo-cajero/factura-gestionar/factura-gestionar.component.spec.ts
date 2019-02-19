import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FacturaGestionarComponent } from './factura-gestionar.component';

describe('FacturaGestionarComponent', () => {
  let component: FacturaGestionarComponent;
  let fixture: ComponentFixture<FacturaGestionarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FacturaGestionarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FacturaGestionarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
