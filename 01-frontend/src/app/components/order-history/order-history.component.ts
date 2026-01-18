import { Component, OnDestroy, OnInit } from '@angular/core';
import { OrderHistory } from 'src/app/common/order-history';
import { OrderHistoryService } from 'src/app/services/order-history.service';
import { map, Subscription } from 'rxjs';
import { PaginatorState } from 'primeng/paginator';

@Component({
  selector: 'app-order-history',
  templateUrl: './order-history.component.html',
  styleUrls: ['./order-history.component.css'],
})
export class OrderHistoryComponent implements OnInit, OnDestroy {
  orderHistoryList: OrderHistory[] = [];
  storage: Storage = sessionStorage;
  subscriptions: Subscription[] = [];
  // Pagination Block
  thePageNumber: number = 1;
  thePageSize: number = 5;
  theTotalElements: number = 0;
  constructor(private orderHistoryService: OrderHistoryService) {}
  ngOnInit(): void {
    this.handleOrderHistory();
  }
  handleOrderHistory() {
    // read the user's email address from browser storage
    const theEmail = JSON.parse(this.storage.getItem('userEmail')!);

    // retrieve data from the service
    this.subscriptions.push(
      this.orderHistoryService
        .getOrderHistory(theEmail, this.thePageNumber - 1, this.thePageSize)
        .subscribe((data) => {
          this.orderHistoryList = data._embedded.orders;
          this.thePageNumber = data.page.number + 1;
          this.thePageSize = data.page.size;
          this.theTotalElements = data.page.totalElements;
        })
    );
  }
  getRemainingOrders(event: PaginatorState) {
    console.log(`${this.thePageNumber} ${event.page}`);
    this.thePageNumber = event.page! + 1;
    this.thePageSize = event.rows!;
    this.handleOrderHistory();
  }
  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }
}
