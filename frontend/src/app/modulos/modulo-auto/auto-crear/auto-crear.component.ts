import { Component, OnInit } from '@angular/core';
import {AutoRestService} from "../../../servicios/rest/auto-rest.service";
import {Router} from "@angular/router";
import {Auto} from "../../../interfaces/auto";

@Component({
  selector: 'app-auto-crear',
  templateUrl: './auto-crear.component.html',
  styleUrls: ['./auto-crear.component.css']
})
export class AutoCrearComponent implements OnInit {

  constructor(
    private readonly _autoRest: AutoRestService,
    private readonly _router: Router
  ) { }

  ngOnInit() {
  }

  crearAuto(auto:Auto){
    console.log(auto);
    const crearAuto$ = this._autoRest.create(auto);
    crearAuto$.subscribe(
      (auto)=> this._router.navigate((['/usuario/gestionAuto']))
    );

  }

}
