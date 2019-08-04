import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListClientInvicesComponent } from './list-client-invoices.component';

describe('ListClientInvicesComponent', () => {
  let component: ListClientInvicesComponent;
  let fixture: ComponentFixture<ListClientInvicesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListClientInvicesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListClientInvicesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
