import { Component, OnInit, ViewChild, ElementRef, AfterViewChecked } from "@angular/core";
import { MessagesService } from "~/shared/rest-api/messages.service";
import { Post } from "../../models";
import { ImgurService } from '~/shared/rest-api/imgur.service';
import { LoginService } from '~/shared';


@Component({
    selector: "chat-messages",
    moduleId: module.id,
    templateUrl: 'messages.component.html',
    styleUrls: ["messages.component.css"]

})
export class MessagesComponent implements OnInit, AfterViewChecked {
    
  
    public messages: Array<Post> = [];
    public inputText: string;
    public autoscrollEnabled = true;
    @ViewChild("ScrollList") scrollList:ElementRef;

    constructor(public msgService: MessagesService, private imgService: ImgurService, private login: LoginService) {
        this.msgService.renderPosts().subscribe(posts => { 
            this.messages = posts;
        });
    }

    ngOnInit(){
    }

    ngAfterViewChecked(): void {
        if (this.scrollList && this.autoscrollEnabled)
        {
           let sv = this.scrollList.nativeElement;
           sv.scrollToVerticalOffset(sv.scrollableHeight, true);
        }
    }
    
    onCameraTap(): void{
        this.imgService.takePhoto();
    }

    onSendTap(text: string){
        this.inputText = "";
        let user = this.login.getUserData();
        if (this.login.getUserData())
            this.msgService.sendPost(text, this.login.getUserData()).subscribe(result => {console.log(result)});
    }
}