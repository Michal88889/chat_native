import { Component, OnInit, ViewChild, ElementRef, QueryList, AfterViewInit, ViewChildren } from "@angular/core";
import { MessagesService } from "~/shared/rest-api/messages.service";
import { Post } from "../../models";
import { ImgurService } from '~/shared/rest-api/imgur.service';
import { LoginService } from '~/shared';
import { takePicture, isAvailable, requestPermissions } from "nativescript-camera";
import { ImageSource } from 'tns-core-modules/image-source/image-source';


@Component({
    selector: "chat-messages",
    moduleId: module.id,
    templateUrl: 'messages.component.html',
    styleUrls: ["messages.component.css"]

})
export class MessagesComponent implements OnInit {
    /**
     * Asta 09.11.2018:
     * 1. Konstruktory komponentów powinny zawierać tylko wstrzykiwane klasy i być puste
     *    ngOnInit powinno zawierać operacje na start komponentu
     * 2. Jak są krótkie funkcje i nie dajesz komentarzy to nie zostawiaj niepotrzebnie wolnych linijek kodu
     */
    public messages: Array<Post> = [];
    public sentMessages: Array<Post> = [];
    public inputText: string;

    constructor(public msgService: MessagesService, private imgService: ImgurService, private login: LoginService) { }

    ngOnInit() {
        this.msgService.renderPosts().subscribe(posts => {
            this.messages = posts;
        });
    }

    onCameraTap(): void {
        requestPermissions();
        takePicture().then(takenImage => {
            let img = new ImageSource().fromAsset(takenImage).then(source => {
                this.imgService.uploadImage(source.toBase64String("png")).subscribe(result => {
                    this.sendMessage("[img]" + result.data.link + "[/img]");
                });
            });
        });
    }

    onSendTap(msgText: string) {

    }

    sendMessage(msgText: string) {
        let user = this.login.getUserData();
        if (this.login.getUserData())
            this.msgService.sendPost(msgText, this.login.getUserData()).subscribe(result => { });
    }
}