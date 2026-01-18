import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { map, Observable } from 'rxjs';
import { OrderHistory } from '../common/order-history';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class OrderHistoryService {
  private baseUrl: string = environment['luv2shopApiUrl'] + '/orders';
  constructor(private httpClient: HttpClient) {}

  getOrderHistory(
    theEmail: string,
    thePageNumber: number,
    thePageSize: number
  ): Observable<GetOrderHistoryResponse> {
    let orderHistoryUrl = `${this.baseUrl}/search/findByCustomerEmailOrderByDateCreatedDesc?email=${theEmail}&page=${thePageNumber}&size=${thePageSize}`;
    return this.httpClient.get<GetOrderHistoryResponse>(orderHistoryUrl);
  }
  // Previous code where we haven't use pagination for order history
  // getOrderHistory(theEmail: string): Observable<OrderHistory[]> {
  //   let orderHistoryUrl = `${this.baseUrl}/search/findByCustomerEmailOrderByDateCreatedDesc?email=${theEmail}`;
  //   return this.httpClient
  //     .get<GetOrderHistoryResponse>(orderHistoryUrl)
  //     .pipe(map((data) => data._embedded.orders));
  // }
}

interface GetOrderHistoryResponse {
  _embedded: {
    orders: OrderHistory[];
  };
  page: {
    size: number;
    totalElements: number;
    totalPages: number;
    number: number;
  };
}
