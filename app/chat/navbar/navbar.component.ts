import { Component, OnInit } from "@angular/core";
import { LoginService } from '~/shared';

@Component({
    selector: "chat-navbar",
    moduleId: module.id,
    template: `
        <StackLayout class="nav">
            <Button text="Chat" 
                [nsRouterLink]="['/chat/messages']"></Button>
            <Button text="Users"
                [nsRouterLink]="['/chat/users']"></Button>
            <Button text="Logout" (tap)="onLogoutTap()"></Button> 
        </StackLayout>
    `
})
export class NavbarComponent implements OnInit {

    constructor(private _loginService: LoginService) {
        // Use the component constructor to inject providers.
    }

    ngOnInit(): void {
        // Init your component properties here.
    }

    onLogoutTap(): void{
        this._loginService.logout();
    }
}
