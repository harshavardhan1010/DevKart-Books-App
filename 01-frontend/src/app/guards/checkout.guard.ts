import {
  ActivatedRouteSnapshot,
  CanActivateFn,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { CartService } from '../services/cart.service';
import { inject } from '@angular/core';

export const checkoutGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  let cartService: CartService = inject(CartService);
  let router: Router = inject(Router);
  if (cartService.cartItems.length === 0) {
    router.navigate(['products']);
    return false;
  }
  return true;
};
