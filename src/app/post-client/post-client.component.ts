import {Component, EventEmitter, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {Client} from '../model/client.model';
@Component({
  selector: 'app-post-client',
  templateUrl: './post-client.component.html',
  styleUrls: ['./post-client.component.css']
})
export class PostClientComponent {
  public client = new Client('', '', '', '', [], '/api/users/' + JSON.parse(localStorage.getItem('user')).id);
  public event: EventEmitter<any> = new EventEmitter();

  constructor(
      public dialogRef: MatDialogRef<PostClientComponent>,
      @Inject(MAT_DIALOG_DATA) public data: any
  ) {
  }
  onNoClick(): void {
    this.dialogRef.close();
  }

  onSubmit(): void {
    this.event.emit({data: this.client});
    this.dialogRef.close();
  }
}
