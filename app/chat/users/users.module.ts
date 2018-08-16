import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptCommonModule } from "nativescript-angular/common";


import { UsersComponent } from "./users.component";
import { UsersRoutingModule } from './users-routing.module';

@NgModule({
    imports: [
        NativeScriptCommonModule,
        UsersRoutingModule
    ],
    declarations: [
        UsersComponent,
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class UsersModule { }
