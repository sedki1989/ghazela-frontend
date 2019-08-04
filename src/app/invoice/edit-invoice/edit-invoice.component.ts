import {Component, EventEmitter, Inject, OnInit} from '@angular/core';
import {Invoice} from '../../model/invoice.model';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
export interface Statut {
  value: string;
  viewValue: string;
}
@Component({
  selector: 'app-edit-invoice',
  templateUrl: './edit-invoice.component.html',
  styleUrls: ['./edit-invoice.component.css']
})
export class EditInvoiceComponent {
  public invoice = new Invoice(0, '', '', '');
  public event: EventEmitter<any> = new EventEmitter();
  status: Statut[] = [
    {value: 'CANCELLED', viewValue: 'CANCELLED'},
    {value: 'SENT', viewValue: 'SENT'},
    {value: 'PAID', viewValue: 'PAID'}
  ];
  constructor(
      public dialogRef: MatDialogRef<EditInvoiceComponent>,
      @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.invoice.sentAt = data.i.sentAt;
    this.invoice.amount = data.i.amount;
    this.invoice.status = data.i.status;
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onSubmit(): void {
    this.event.emit({data: this.invoice, id : this.data.i.id});
    this.dialogRef.close();
  }

}
