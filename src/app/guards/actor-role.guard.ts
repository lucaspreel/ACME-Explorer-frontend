import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { resolve } from 'url';
import { AuthService } from '../services/auth.service';
import RolesEnum from '../utils/roles_enum';

@Injectable({
  providedIn: 'root'
})
export class ActorRoleGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {

  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    return new Promise((resolve, reject) => {
      const expectedRole = next.data.expectedRole.toUpperCase();
      const role = this.authService.getRole().toUpperCase();
      const roleExp = new RegExp(role.toString(), 'i');
      let result = false;
      if (role) {
        if (expectedRole.indexOf(RolesEnum.anonymous) !== -1) {
          result = true;
        } else if (expectedRole.indexOf(RolesEnum.signedIn) !== -1) {
          result = true;
        }
        else if (expectedRole.search(roleExp) !== -1) {
          result = true;
        }
        else {
          this.router.navigate(['denied-access'], { queryParams: { previousURL: state.url } })
        }
        resolve(result);
      } else {
        if (expectedRole.indexOf(RolesEnum.anonymous) !== -1) {
          result = true;
        } else {
          this.router.navigate(['login'], { queryParams: { returnUrl: state.url } });
        }
        resolve(result);
      }

    });
  }
}
