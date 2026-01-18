import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot } from '@angular/router';
import { Subscription } from 'rxjs';
import { CartItem } from 'src/app/common/cart-item';
import { Product } from 'src/app/common/product';
import { CartService } from 'src/app/services/cart.service';
import { ProductService } from 'src/app/services/product.service';
const PROD_ID = 'prodId';
const CAT_ID = 'catId';
const PAGE_NO = 'pageNo';
@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css'],
})
export class ProductDetailsComponent implements OnInit, OnDestroy {
  subscriptions: Subscription[] = [];
  product: Product = new Product();
  categoryId!: number;
  pageNo!: number;
  constructor(
    private productService: ProductService,
    private cartService: CartService,
    private route: ActivatedRoute
  ) {}
  ngOnInit(): void {
    this.categoryId = +this.route.snapshot.paramMap.get(CAT_ID)!;
    this.pageNo = +this.route.snapshot.paramMap.get(PAGE_NO)!;
    // console.log(`CategoryId: ${+this.route.snapshot.paramMap.get(CAT_ID)!},PageNumber: ${+this.route.snapshot.paramMap.get(PAGE_NO)!}`);
    this.subscriptions.push(
      this.route.paramMap.subscribe(() => {
        this.handleProductDetails();
      })
    );
  }
  handleProductDetails() {
    const theProductId: number = +this.route.snapshot.paramMap.get(PROD_ID)!;
    this.subscriptions.push(
      this.productService
        .getProduct(theProductId)
        .subscribe((data) => (this.product = data))
    );
  }
  addToCart() {
    // adding element to cart
    let cartItem = new CartItem(this.product);
    this.cartService.addToCart(cartItem);
  }
  ngOnDestroy(): void {
    this.subscriptions.forEach((subscriber) => subscriber.unsubscribe());
  }
}
