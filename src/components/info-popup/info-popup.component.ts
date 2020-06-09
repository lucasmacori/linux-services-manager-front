import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Message } from 'src/models/message.model';

@Component({
  selector: 'app-info-popup',
  templateUrl: './info-popup.component.html',
  styleUrls: ['./info-popup.component.scss']
})
export class InfoPopupComponent {

  public title: string;
  public message: string;

  constructor(
    public dialogRef: MatDialogRef<InfoPopupComponent>,
      @Inject(MAT_DIALOG_DATA) public data: Message
  ) {
    this.title = data.title;
    this.message = data.message;
  }

  public close(): void {
    this.dialogRef.close();
  }
}
