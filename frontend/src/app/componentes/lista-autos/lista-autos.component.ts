import {Component, Input, OnInit} from '@angular/core';
import {Auto} from "../../interfaces/auto";

@Component({
  selector: 'app-lista-autos',
  templateUrl: './lista-autos.component.html',
  styleUrls: ['./lista-autos.component.css']
})
export class ListaAutosComponent implements OnInit {

  auto = <Auto>{};

  constructor() {
  }

  @Input()
  autoAux: Auto;

  ngOnInit() {
    this.auto = JSON.parse(JSON.stringify(this.autoAux));
  }
}
