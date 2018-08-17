import { NgModule } from "@angular/core";
import { Routes } from "@angular/router";
import { NativeScriptRouterModule } from "nativescript-angular/router";

import { ChatComponent } from "./chat.component";
import { MessagesComponent } from './messages/messages.component';
import { UsersComponent } from './users/users.component';
import { AuthGuard } from '../shared';

const routes: Routes = [
    { path: "chat", component: ChatComponent, canActivate: [AuthGuard], 
    children: [
        { path: "", component: MessagesComponent },
        { path: "messages", component: MessagesComponent },
        { path: "users", component: UsersComponent }
    ]},
    // { path: "chat/messages", loadChildren: "./messages/messages.module#MessagesModule" }
];

@NgModule({
    imports: [NativeScriptRouterModule.forChild(routes)],
    exports: [NativeScriptRouterModule]
})
export class ChatRoutingModule { }
