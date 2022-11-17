import { Directive, Input, HostListener } from '@angular/core';
import { EditableComponent } from '../inventarios/editable-component/editable-component.component';

@Directive({
  selector: '[editableOnEnter]'
})
export class EditableOnEnterDirective {
  constructor(private editable: EditableComponent) {
  }

  @HostListener('keyup.enter')
  onEnter() {
    this.editable.toViewMode();
  }

}
