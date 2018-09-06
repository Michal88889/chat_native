import { Component, OnInit, Input } from "@angular/core";
import { fromEventPattern } from "rxjs";

@Component({
    selector: "single-message",
    moduleId: module.id,
    templateUrl: "single-message.component.html",
    styleUrls: ["single-message.component.css"]
})
export class SingleMessageComponent implements OnInit {

    @Input()
    message;

    constructor() {
        // Use the component constructor to inject providers.
    }

    ngOnInit(): void {
        // Init your component properties here.
    }
}
