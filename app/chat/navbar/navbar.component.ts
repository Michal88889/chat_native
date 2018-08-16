import { Component, OnInit } from "@angular/core";

@Component({
    selector: "chat-navbar",
    moduleId: module.id,
    template: `
        <StackLayout class="nav">
            <Button text="Chat" 
                [nsRouterLink]="['/chat/messages']"></Button>
            <Button text="Users"
                [nsRouterLink]="['/chat/users']"></Button>
        </StackLayout>
    `
})
export class NavbarComponent implements OnInit {

    constructor() {
        // Use the component constructor to inject providers.
    }

    ngOnInit(): void {
        // Init your component properties here.
    }
}
