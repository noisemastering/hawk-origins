import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-eliminar-receta',
  templateUrl: './eliminar-receta.component.html',
  styleUrls: ['./eliminar-receta.component.scss']
})
export class EliminarRecetaComponent implements OnInit {

  title="Eliminar Subreceta";
  permission= false;
  theForm: FormGroup;

  constructor() { }

  ngOnInit() {
  }

  onClose(){}

}
