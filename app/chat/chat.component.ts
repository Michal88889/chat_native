import { Component, OnInit } from "@angular/core";
import { LoginService } from "~/shared";

@Component({
    selector: "Chat",
    moduleId: module.id,
    template: `
    <StackLayout>
        <chat-navbar></chat-navbar>
        <router-outlet></router-outlet>
    </StackLayout>
    `
})
export class ChatComponent implements OnInit {

    constructor(private loginSerivce: LoginService) {
        // Use the component constructor to inject providers.
    }

    ngOnInit(): void {
        this.loginSerivce.test(); // test method
    }
}
