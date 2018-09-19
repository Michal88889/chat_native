import { Component, OnInit } from "@angular/core";
import { fromEventPattern } from "rxjs";
import { ApiResponse } from "~/models";
import { MessagesService } from "~/shared/rest-api/messages.service";
import { Post } from "../../models";

@Component({
    selector: "chat-messages",
    moduleId: module.id,
    templateUrl: 'messages.component.html',
})
export class MessagesComponent implements OnInit {
  
    public messages: Array<Post> = [];

    constructor(public msgService: MessagesService) {
        this.msgService.renderPosts().subscribe(posts => { this.messages = posts });
    }

    ngOnInit(){
    }
}
