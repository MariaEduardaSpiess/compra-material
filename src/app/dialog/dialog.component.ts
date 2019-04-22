import { BsModalRef } from 'ngx-bootstrap/modal';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.sass']
})
export class DialogComponent {

  @Input() titulo: string;
  @Input() mensagem: string;

  constructor(private _bsModalRef: BsModalRef) {

  }

  public onConfirm(): void {
      this._bsModalRef.hide();
  }

}
