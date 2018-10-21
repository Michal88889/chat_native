import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptCommonModule } from "nativescript-angular/common";


import { MessagesComponent } from "./messages.component";
import { MessagesRoutingModule } from './messages-routing.module';
import { SingleMessageComponent } from "./single_message/single-message.component";
import { ImgurService } from '~/shared/rest-api/imgur.service';

@NgModule({
    imports: [
        NativeScriptCommonModule,
        MessagesRoutingModule
    ],
    declarations: [
        MessagesComponent,
        SingleMessageComponent,
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ],
    providers: [
        ImgurService
    ]
})
export class MessagesModule { }
