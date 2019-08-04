import {Component, EventEmitter, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {Invoice} from '../../model/invoice.model';

export interface Statut {
  value: string;
  viewValue: string;
}
@Component({
  selector: 'app-add-invoice',
  templateUrl: './add-invoice.component.html',
  styleUrls: ['./add-invoice.component.css']
})
export class AddInvoiceComponent {
  public invoice = new Invoice(0, '', '', '');
  public event: EventEmitter<any> = new EventEmitter();
  status: Statut[] = [
    {value: 'CANCELLED', viewValue: 'CANCELLED'},
    {value: 'SENT', viewValue: 'SENT'},
    {value: 'PAID', viewValue: 'PAID'}
  ];
  constructor(
      public dialogRef: MatDialogRef<AddInvoiceComponent>,
      @Inject(MAT_DIALOG_DATA) public data: any
  ) {
  }
  onNoClick(): void {
    this.dialogRef.close();
  }

  onSubmit(): void {
    this.event.emit({data: this.invoice});
    this.dialogRef.close();
  }

}
