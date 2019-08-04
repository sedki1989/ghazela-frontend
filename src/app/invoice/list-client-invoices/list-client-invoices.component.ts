import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {InvoicesService} from '../../services/invoices.service';
import {debounceTime, tap, distinctUntilChanged} from 'rxjs/operators';
import {AuthenticationService} from '../../services/authentication.service';
import {MatDialog, MatPaginator, MatSnackBar, MatSnackBarConfig} from '@angular/material';
import {PostClientComponent} from '../../post-client/post-client.component';
import {AddInvoiceComponent} from '../add-invoice/add-invoice.component';
import {EditInvoiceComponent} from '../edit-invoice/edit-invoice.component';
@Component({
  selector: 'app-list-client-invoices',
  templateUrl: './list-client-invoices.component.html',
  styleUrls: ['./list-client-invoices.component.css']
})
export class ListClientInvoicesComponent implements OnInit, AfterViewInit {
    id: string;
    client: string;
    public config = new MatSnackBarConfig();
    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild('input') input: ElementRef;
    displayedColumns = ['Number', 'Send Date', 'State', 'Amount', 'delete', 'edit'];
    invoicesSize = 0;
    public invoices: any;
  constructor(private authservise: AuthenticationService, private route: ActivatedRoute,
              private router: Router, private invoiceService: InvoicesService, public dialog: MatDialog, private snackBar: MatSnackBar ) {
      this.config.verticalPosition = 'bottom';
      this.config.horizontalPosition = 'right';
      this.config.duration = 3000;
  }

  ngOnInit() {
      this.route.paramMap.subscribe(params => {
          this.id = params.get('id');
          this.client = params.get('client');
          console.log(this.client);
      });
      if (this.authservise.isAuthenticated()) {
              this.invoiceService.getInvoicesListByClient( this.id, 1, 5)
              .subscribe(data => {
                  this.invoices = data['hydra:member'];
                  this.invoicesSize = parseInt(data['hydra:totalItems'], 10);
                  console.log(data);
              }, err => {
                  console.log(err);
              });
      } else {
          this.router.navigateByUrl('/');
      }
  }
    ngAfterViewInit() {
        this.paginator.page
            .pipe(
                tap(() => this.loadInvoicesPage())
            )
            .subscribe();
    }
    loadInvoicesPage() {
        console.log( 'pagesizes' + this.paginator.pageSize );
        this.invoiceService.getInvoicesListByClient(this.id, this.paginator.pageIndex + 1, this.paginator.pageSize)
            .subscribe(data => {
                this.invoices = data['hydra:member'];
                this.invoicesSize = parseInt(data['hydra:totalItems'], 10);
                console.log(this.invoices);
            }, err => {
                console.log(err);
            });
    }
    openDialog(): void {
        const dialogRef = this.dialog.open(AddInvoiceComponent, {
            width: '600px',
            data: 'Add Invoice'
        });
        dialogRef.componentInstance.event.subscribe((result) => {
            result.data.customer = '/api/customers/' + this.id;
            console.log(result.data);
            result.data.sentAt.toString();
            this.invoiceService.addInvoice(result.data)
                .subscribe(res => {
                    this.snackBar.open('Invoice added', 'ok', this.config);
                    console.log(res);
                    this.ngOnInit();
                }, err => {
                    console.log(err);
                });
        });
    }
    onDeleteInvoice(id) {
        const conf = confirm('Etes vous sure?');
        if (conf) {
            this.invoiceService.deleteInvoice(id)
                .subscribe(data => {
                    this.snackBar.open('Invoice deleted', 'ok', this.config);
                    this.loadInvoicesPage();
                } , err => {
                    console.log(err);
                });
        }
    }
    onEditInvoice(invoice): void {
        const dialogRef = this.dialog.open(EditInvoiceComponent, {
            width: '600px',
            data: {
                s: 'Edit Invoice',
                i: invoice
            }
        });
        dialogRef.componentInstance.event.subscribe((result) => {
            console.log(result.data);
            this.invoiceService.editInvoice(result.data, result.id)
                .subscribe(res => {
                    console.log(res);
                    this.ngOnInit();
                    this.snackBar.open('Invoice edited', 'ok', this.config);
                }, err => {
                    console.log(err);
                });
        }

        );
    }
}
