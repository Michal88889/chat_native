import { Component, OnInit } from "@angular/core";

@Component({
    selector: "Login",
    moduleId: module.id,
    template: `
    <GridLayout class="page">
        <Label class="h3 p-15" text="Tu będzie logowanie"></Label>
    </GridLayout>
    `
})
export class LoginComponent implements OnInit {

    constructor() {
        // Use the component constructor to inject providers.
    }

    ngOnInit(): void {
        // Init your component properties here.
    }
}
