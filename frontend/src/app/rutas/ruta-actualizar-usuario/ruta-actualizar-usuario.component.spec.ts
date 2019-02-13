import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RutaActualizarUsuarioComponent } from './ruta-actualizar-usuario.component';

describe('RutaActualizarUsuarioComponent', () => {
  let component: RutaActualizarUsuarioComponent;
  let fixture: ComponentFixture<RutaActualizarUsuarioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RutaActualizarUsuarioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RutaActualizarUsuarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
