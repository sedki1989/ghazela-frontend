import {Component, EventEmitter, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {Client} from '../model/client.model';
@Component({
  selector: 'app-edit-client',
  templateUrl: './edit-client.component.html',
  styleUrls: ['./edit-client.component.css']
})
export class EditClientComponent {
  public client = new Client('', '', '', '', [], '/api/users/' + JSON.parse(localStorage.getItem('user')).id);
  public event: EventEmitter<any> = new EventEmitter();
  constructor(
      public dialogRef: MatDialogRef<EditClientComponent>,
      @Inject(MAT_DIALOG_DATA) public data: any,
  ) {
    this.client.lastName = data.c.lastName;
    this.client.firstName = data.c.firstName;
    this.client.company = data.c.company;
    this.client.email = data.c.email;
  }
  onNoClick(): void {
    this.dialogRef.close();
  }

  onSubmit(): void {
    this.event.emit({data: this.client, id : this.data.c.id});
    this.dialogRef.close();
  }
}
