import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {PostClientComponent} from '../post-client/post-client.component';
import {MatDialog, MatPaginator, MatSnackBar, MatSnackBarConfig} from '@angular/material';
import {CustomersService} from '../services/customers.service';
import {debounceTime, tap, distinctUntilChanged} from 'rxjs/operators';
import {fromEvent} from 'rxjs';
import {EditClientComponent} from '../edit-client/edit-client.component';
import {Router} from '@angular/router';
import {AuthenticationService} from '../services/authentication.service';
@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.css']
})
export class ClientsComponent implements AfterViewInit, OnInit {
  public config = new MatSnackBarConfig();
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild('input') input: ElementRef;
  displayedColumns = ['Client', 'Email', 'Entreprise', 'invoices', 'Montant', 'delete', 'edit'];
  clientsSize = 0;
  public customers: any;
  constructor( private authservise: AuthenticationService, public dialog: MatDialog,
               private customerservise: CustomersService, private router: Router, private snackBar: MatSnackBar) {
      this.config.verticalPosition = 'bottom';
      this.config.horizontalPosition = 'right';
      this.config.duration = 3000;
  }
  openDialog(): void {
    const dialogRef = this.dialog.open(PostClientComponent, {
      width: '600px',
      data: 'Add Client'
    });
    dialogRef.componentInstance.event.subscribe((result) => {
        console.log(result.data);
        this.customerservise.addCustomers(result.data)
            .subscribe(res => {
                this.snackBar.open('Client added', 'ok', this.config);
                console.log(res);
                this.ngOnInit();
            }, err => {
                console.log(err);
            });
    });
  }
    onEditClient(client): void {
        const dialogRef = this.dialog.open(EditClientComponent, {
            width: '600px',
            data: {
                s: 'Edit Client',
                c: client
            }
        });
        dialogRef.componentInstance.event.subscribe((result) => {
            console.log(result.data);
            this.customerservise.editCustomers(result.data, result.id)
                .subscribe(res => {
                    console.log(res);
                    this.ngOnInit();
                    this.snackBar.open('Client edited', 'ok', this.config);
                }, err => {
                    console.log(err);
                });
        }

        );
    }
  ngAfterViewInit() {
      fromEvent (this.input.nativeElement, 'keyup')
          .pipe(
              debounceTime(150),
              distinctUntilChanged () ,
              tap(() => {
                  this.paginator.pageIndex = 0;
                  this.loadClientsPage();
              })
          )
          .subscribe();

      this.paginator.page
        .pipe(
            tap(() => this.loadClientsPage())
        )
        .subscribe();
  }
  ngOnInit(): void {
    if (this.authservise.isAuthenticated()) {
    this.customerservise.getCustomers(1, 5, '')
        .subscribe(data => {
          this.customers = data['hydra:member'];
          this.clientsSize = parseInt(data['hydra:totalItems'], 10);
          console.log(this.customers);
        }, err => {
          console.log(err);
        });
    } else {
        this.router.navigateByUrl('/');
    }
  }
  loadClientsPage() {
    console.log('nb2 = ' + this.paginator.pageIndex );
    this.customerservise.getCustomers(this.paginator.pageIndex + 1, this.paginator.pageSize, this.input.nativeElement.value)
        .subscribe(data => {
          this.customers = data['hydra:member'];
          this.clientsSize = parseInt(data['hydra:totalItems'], 10);
          console.log(this.customers);
        }, err => {
          console.log(err);
        });
  }
    onDeleteClient(id, name) {
        const conf = confirm('Delet ' + name + '?');
        if (conf) {
            this.customerservise.deleteCustomers(id)
                .subscribe(data => {
                    this.snackBar.open('Client deleted', 'ok', this.config);
                    this.loadClientsPage();
                } , err => {
                    console.log(err);
                });
        }
    }
}
