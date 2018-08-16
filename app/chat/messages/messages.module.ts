import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptCommonModule } from "nativescript-angular/common";


import { MessagesComponent } from "./messages.component";
import { MessagesRoutingModule } from './messages-routing.module';

@NgModule({
    imports: [
        NativeScriptCommonModule,
        MessagesRoutingModule
    ],
    declarations: [
        MessagesComponent,
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class MessagesModule { }
