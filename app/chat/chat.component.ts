import { Component, OnInit } from "@angular/core";

@Component({
    selector: "Chat",
    moduleId: module.id,
    template: `
    <StackLayout>
        <StackLayout class="nav">
            <Button text="First" 
                [nsRouterLink]="['/first']"></Button>
            <Button text="Second"
                [nsRouterLink]="['/second']"></Button>
        </StackLayout>

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
