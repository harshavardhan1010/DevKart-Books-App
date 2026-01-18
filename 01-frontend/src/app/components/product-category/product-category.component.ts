import { Component, OnDestroy, OnInit } from '@angular/core';
import { OktaAuthStateService } from '@okta/okta-angular';
import { MenuItem } from 'primeng/api';
import { map, Subscription } from 'rxjs';
import { ProductCategory } from 'src/app/common/product-category';
import { ProductService } from 'src/app/services/product.service';
@Component({
  selector: 'app-product-category',
  templateUrl: './product-category.component.html',
  styleUrls: ['./product-category.component.css'],
})
export class ProductCategoryComponent implements OnInit, OnDestroy {
  subscriptions: Subscription[] = [];
  productCategory: ProductCategory[] = [];
  items: MenuItem[] = [];
  categories: MenuItem[] = [];
  isAuthenticated: boolean = false;
  ngOnInit(): void {
    this.listProductCategory();
    this.oktaAuthService.authState$.subscribe((result) => {
      this.isAuthenticated = result.isAuthenticated!;
    });
    this.items = [
      {
        label: 'Category',
        items: this.categories,
      },
      {
        label: 'Member',
        routerLink: '/members',
        visible: this.isAuthenticated,
      },
      {
        label: 'Orders',
        routerLink: '/order-history',
        visible: this.isAuthenticated,
      },
    ];
  }
  constructor(
    private productService: ProductService,
    private oktaAuthService: OktaAuthStateService
  ) {}
  listProductCategory() {
    this.subscriptions.push(
      this.productService
        .getProductCategory()
        .pipe(
          map((data) => {
            // Push ProductCategory objects to productCategory array
            this.productCategory = data;
            // Create Item objects from each ProductCategory
            return data.map((prodCat) => new Item(prodCat) as MenuItem);
          })
        )
        .subscribe((categories) => {
          // Push Item objects to categories array
          this.categories.push(...categories);
        })
    );
    /*
    uncomment this code push method and comment above push method if you want to make product category to use simple html block which is commented in product-category.component.html
    this.subscriptions.push(
      this.productService.getProductCategory().subscribe((data) => {
        this.productCategory = data;
        this.productCategory.forEach((prodCat) =>
          console.log(prodCat)
        );
      })
    );*/
  }
  ngOnDestroy(): void {
    this.subscriptions.forEach((item) => item.unsubscribe());
  }
}
class Item {
  label?: string;
  icon?: string;
  styleClass?: string;
  title?: string;
  routerLink?: any;
  routerLinkActiveOptions?: any;
  routerLinkActive?: string;
  constructor(productCategory: ProductCategory) {
    this.label = productCategory.categoryName;
    this.routerLink = `/category/${productCategory.id}`;
    this.styleClass = 'product-category';
    this.routerLinkActiveOptions = { exact: true };
    this.routerLinkActive = 'router-link-active';
  }
}
