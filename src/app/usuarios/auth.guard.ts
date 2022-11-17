import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Usuario } from '../shared/classes/usuario';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router){}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
      if(localStorage.getItem('Usuario')!=null)
        {
          let user: Usuario;
          user= JSON.parse(localStorage.getItem('Usuario'));
          //console.log("User auth: ", user);
          if (user.Token!=null) return true;
        }
      else{
        this.router.navigate(['/usuario/login']);
        return false;
      }
  }
}
