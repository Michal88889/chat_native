import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptCommonModule } from "nativescript-angular/common";

import { ChatRoutingModule } from "./chat-routing.module";
import { MessagesModule } from './messages/messages.module';
import { UsersModule } from './users/users.module';

import { ChatComponent } from "./chat.component";
import { NavbarComponent } from './navbar/navbar.component';

@NgModule({
    imports: [
        NativeScriptCommonModule,
        ChatRoutingModule,
        MessagesModule,
        UsersModule
    ],
    declarations: [
        ChatComponent,
        NavbarComponent
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class ChatModule { }