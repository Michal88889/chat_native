import { Component, OnInit } from "@angular/core";
import { NavbarComponent } from './navbar/navbar.component';

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

    constructor() {
        // Use the component constructor to inject providers.
    }

    ngOnInit(): void {
        // Init your component properties here.
    }
}
