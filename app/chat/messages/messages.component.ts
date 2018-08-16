import { Component, OnInit } from "@angular/core";

@Component({
    selector: "chat-messages",
    moduleId: module.id,
    template: `
    <GridLayout class="page">
        <Label class="h3 p-15" text="Wiadomości chat"></Label>
    </GridLayout>
    `
})
export class MessagesComponent implements OnInit {

    constructor() {
        // Use the component constructor to inject providers.
    }

    ngOnInit(): void {
        // Init your component properties here.
    }
}
