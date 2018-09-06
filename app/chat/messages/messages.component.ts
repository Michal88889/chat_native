import { Component, OnInit } from "@angular/core";
import { fromEventPattern } from "rxjs";
import { ApiResponse } from "~/models";
import { MessagesService } from "~/shared/rest-api/messages.service";

@Component({
    selector: "chat-messages",
    moduleId: module.id,
    templateUrl: 'messages.component.html',
    providers: [MessagesService]
    
})
export class MessagesComponent implements OnInit {

    apiResponse: ApiResponse;
    
    constructor(private msgService: MessagesService) {
        // Use the component constructor to inject providers.
    }

    ngOnInit(): void {
        this.msgService.getLastMessages().subscribe(response => {this.apiResponse = response});
    }
}
