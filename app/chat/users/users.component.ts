import { Component, OnInit } from "@angular/core";

@Component({
    selector: "chat-users",
    moduleId: module.id,
    template: `
    <GridLayout class="page">
        <Label class="h3 p-15" text="Użytkownicy"></Label>
    </GridLayout>
    `
})
export class UsersComponent implements OnInit {

    constructor() {
        // Use the component constructor to inject providers.
    }

    ngOnInit(): void {
        // Init your component properties here.
    }
}
