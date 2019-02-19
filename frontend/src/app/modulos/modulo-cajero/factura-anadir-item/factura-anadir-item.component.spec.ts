import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FacturaAnadirItemComponent } from './factura-anadir-item.component';

describe('FacturaAnadirItemComponent', () => {
  let component: FacturaAnadirItemComponent;
  let fixture: ComponentFixture<FacturaAnadirItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FacturaAnadirItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FacturaAnadirItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
