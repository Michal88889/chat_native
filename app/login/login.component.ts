import { Component, OnInit } from "@angular/core";
import { Page } from 'tns-core-modules/ui/page/page';
import { isAndroid } from "tns-core-modules/platform";
import { LoginService } from '~/shared';

@Component({
    selector: "Login",
    moduleId: module.id,
    templateUrl: "login.component.html"
})
export class LoginComponent implements OnInit {
    /**
     * Asta 09.11.2018:
     * 1. _loginSerivce => loginService (camelCase wszędzie, to wszędzie)
     * 2. Konstruktory komponentów powinny zawierać tylko wstrzykiwane klasy i być puste
     *    ngOnInit powinno zawierać operacje na start komponentu
     * 3. tryLogin => login - tylko dlatego, że nazwa funkcji login jest używana absolutnie wszędzie
     *    więc to "tryLogin" wygląda zwyczajnie nieprofesjonalnie
     */
    public errorMessage: string;
    public isRemembered: boolean = true;
    constructor(private page: Page, private loginService: LoginService) { }

    ngOnInit(): void {
        if (isAndroid) {
            this.page.actionBarHidden = true;
        }
    }

    login(login: string, password: string): void {
        this.loginService.login(login, password).subscribe(response => {
            if (response.status)
                this.loginService.finalizeLogin(response.result, this.isRemembered);
            else {
                console.log(response.message);
            }
        });
    }
}
