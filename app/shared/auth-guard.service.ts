import { Injectable } from "@angular/core";
import { Router, CanActivate } from "@angular/router";
import { LoginService } from "~/shared/rest-api/login.service";

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private loginService: LoginService) { }

  canActivate() {
    if (this.loginService.isLoggedIn()) { //tu będzie provider do sprawdzania zalogowania
      return true;
    }
    else {
      this.router.navigate(["/login"]);
      return false;
    }
  }
}