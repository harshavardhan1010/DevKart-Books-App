import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PaginatorState } from 'primeng/paginator';
import { Subscription } from 'rxjs';
import { CartItem } from 'src/app/common/cart-item';
import { Product } from 'src/app/common/product';
import { CartService } from 'src/app/services/cart.service';
import { ProductService } from 'src/app/services/product.service';
import { AnimationOptions } from 'ngx-lottie';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
})
export class ProductListComponent implements OnInit, OnDestroy {
  products: Product[] = [];
  currentCategoryId: number = 1;
  previousCategoryId: number = 1;
  searchMode: boolean = false;
  subscriptions: Subscription[] = [];

  // new properties for pagination
  thePageNumber: number = 1;
  thePageSize = 5;
  theTotalElements: number = 0;

  previousKeyword: string = '';

  // lottie property
  notFound: AnimationOptions = {
    path: 'assets/images/lottie-assets/Animation - 1714301078698.json',
    loop: false,
  };

  ngOnInit(): void {
    // console.log(`This is current route: ${this.route.snapshot.url}`);
    this.subscriptions.push(
      this.route.paramMap.subscribe(() => this.listProducts())
    );
  }
  constructor(
    private productService: ProductService,
    private cartService: CartService,
    private route: ActivatedRoute
  ) {}
  listProducts() {
    this.searchMode = this.route.snapshot.paramMap.has('keyword');
    if (this.searchMode) {
      this.handleSearchProducts();
    } else {
      this.handleListProducts();
    }
  }

  handleSearchProducts() {
    let theKeyword = this.route.snapshot.paramMap.get('keyword')!;
    if (this.previousKeyword != theKeyword) {
      this.thePageNumber = 1;
    }
    this.previousKeyword = theKeyword;

    // console.log(`keyword=${theKeyword},thePageNumber=${this.thePageNumber}`);
    this.subscriptions.push(
      this.productService
        .searchProductsPaginate(
          this.thePageNumber - 1,
          this.thePageSize,
          theKeyword
        )
        .subscribe(this.processResult())
    );
    // this.subscriptions.push(
    //   this.productService
    //     .getSearchProducts(theKeyword)
    //     .subscribe((data) => (this.products = data))
    // );
  }
  handleListProducts() {
    // checking if there exists a query param id is present or not
    let hasCategoryId: boolean = this.route.snapshot.paramMap.has('id');
    // let hasPageNo: boolean = this.route.snapshot.paramMap.has('pageNo');
    // updating current category id with new category id if it exists or else assignit default categoryid = 1
    this.currentCategoryId = hasCategoryId
      ? +this.route.snapshot.paramMap.get('id')!
      : 1;
    // if (hasPageNo) {
    //   console.log(
    //     `Yes pageno exists ${this.route.snapshot.paramMap.get('pageNo')}`
    //   );
    //   if (+this.route.snapshot.paramMap.get('pageNo')! != 0) {
    //     this.thePageNumber = +this.route.snapshot.paramMap.get('pageNo')!;
    //   }
    // }
    // now get the products for the given category id
    // Check if we have different category than previous
    // Note: angular will reuse a component if it is currently being viewed

    // if we have a different category id than previous than set the thePageNumber back to 1
    if (this.previousCategoryId != this.currentCategoryId) {
      this.thePageNumber = 1;
    }
    this.previousCategoryId = this.currentCategoryId;
    // console.log(`currentCategoryId=${this.currentCategoryId},thePageNumber=${this.thePageNumber}`);
    this.subscriptions.push(
      this.productService
        .getProductListPaginate(
          this.thePageNumber - 1,
          this.thePageSize,
          this.currentCategoryId
        )
        .subscribe(this.processResult())
    );
    // this.subscriptions.push(
    //   this.productService
    //     .getProductsList(this.currentCategoryId)
    //     .subscribe((data) => (this.products = data))
    // );
  }

  addToCart(theProduct: Product) {
    // console.log(`Adding to cart: ${theProduct.name}, ${theProduct.unitPrice}`);
    let theCartItem = new CartItem(theProduct);

    // TODO: ... for the real work
    this.cartService.addToCart(theCartItem);
  }
  onPageChange(event: PaginatorState) {
    this.thePageNumber = event.page! + 1;
    this.thePageSize = event.rows!;
    this.listProducts();
    // console.log(`page=${event.page},first=${event.first},pageCount=${event.pageCount},rows=${event.rows}`);
  }

  processResult() {
    return (data: any) => {
      this.products = data._embedded.products;
      this.thePageNumber = data.page.number + 1;
      this.thePageSize = data.page.size;
      this.theTotalElements = data.page.totalElements;
      // console.log(`thePageNumber=${this.thePageNumber},thePageSize=${this.thePageSize},theTotalElements=${this.theTotalElements}`);
    };
  }
  ngOnDestroy(): void {
    this.subscriptions.forEach((item) => item.unsubscribe());
  }
}
