import { Injectable } from "@angular/core";
import { Router, CanActivate } from "@angular/router";

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private router: Router) { }

  canActivate() {
    if (this.isLoggedIn()) { //tu będzie provider do sprawdzania zalogowania
      return true;
    }
    else {
      this.router.navigate(["/login"]);
      return false;
    }
  }

  public isLoggedIn() {
    return true;
  }
}