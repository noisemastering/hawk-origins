import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-eliminar-subreceta',
  templateUrl: './eliminar-subreceta.component.html',
  styleUrls: ['./eliminar-subreceta.component.scss']
})
export class EliminarSubrecetaComponent implements OnInit {

  title="Eliminar Subreceta";
  permission= false;
  theForm: FormGroup;

  constructor() { }

  ngOnInit() {
  }

  onClose(){}
}
