import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from "@angular/core";
import { fromEventPattern } from "rxjs";
import { ApiResponse } from "~/models";
import { MessagesService } from "~/shared/rest-api/messages.service";
import { Post } from "../../models";
import { ImgurService } from '~/shared/rest-api/imgur.service';
import { ScrollView } from "tns-core-modules/ui/scroll-view";

@Component({
    selector: "chat-messages",
    moduleId: module.id,
    templateUrl: 'messages.component.html',
    styleUrls: ["messages.component.css"]

})
export class MessagesComponent implements OnInit {
  
    public messages: Array<Post> = [];
    public autoscrollEnabled = true;
    @ViewChild("ScrollList") scrollList:ElementRef;

    constructor(public msgService: MessagesService, private imgService: ImgurService) {
        this.msgService.renderPosts().subscribe(posts => { 
            this.messages = posts;
            if (this.scrollList && this.autoscrollEnabled)
            {
               let sv = this.scrollList.nativeElement;
               sv.scrollToVerticalOffset(sv.scrollableHeight, true);
            }
        });
    }

    ngOnInit(){
    }

    onCameraTap(): void{
        this.imgService.takePhoto();
    }
}
