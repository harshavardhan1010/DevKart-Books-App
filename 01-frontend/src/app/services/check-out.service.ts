import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Purchase } from '../common/purchase';
import { environment } from 'src/environments/environment';
import { PaytmentInfo } from '../common/paytment-info';

@Injectable({
  providedIn: 'root',
})
export class CheckOutService {
  private purchaseUrl = environment['luv2shopApiUrl'] + '/checkout/purchase';

  private paymentIntentUrl =
    environment['luv2shopApiUrl'] + '/checkout/payment-intent';

  constructor(private httpClient: HttpClient) {}

  placeOrder(purchase: Purchase): Observable<any> {
    return this.httpClient.post<Purchase>(this.purchaseUrl, purchase);
  }

  createPaymentIntent(paymentInfo: PaytmentInfo): Observable<any> {
    return this.httpClient.post<PaytmentInfo>(
      this.paymentIntentUrl,
      paymentInfo
    );
  }
}
