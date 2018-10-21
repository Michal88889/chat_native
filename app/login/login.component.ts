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

    public errorMessage: string;
    public isRemembered: boolean;
    constructor(private page: Page, private _loginService: LoginService) {
        if (isAndroid) {
            this.page.actionBarHidden = true;
        }
    }

    ngOnInit(): void {
        // Init your component properties here.
    }

    tryLogin(login: string, password: string): void{
        
        this._loginService.login(login, password).then(resolve => {
            if (resolve.status)
                this._loginService.finalizeLogin(resolve.result, this.isRemembered)
            else{
                this.errorMessage = resolve.message;
            }
        });
    }
}
