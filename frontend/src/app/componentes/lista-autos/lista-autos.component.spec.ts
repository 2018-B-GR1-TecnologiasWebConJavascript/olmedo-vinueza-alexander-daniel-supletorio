import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaAutosComponent } from './lista-autos.component';

describe('ListaAutosComponent', () => {
  let component: ListaAutosComponent;
  let fixture: ComponentFixture<ListaAutosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListaAutosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListaAutosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
