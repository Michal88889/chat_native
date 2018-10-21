import { Injectable } from "@angular/core";
import { HttpHeaders, HttpClient } from "@angular/common/http";
import { tap, map} from "rxjs/operators";
import { Observable } from "rxjs";
import { knownFolders, File, Folder, path } from "file-system";

import { ApiResponse } from '../../models';
import { ApiService } from "./api.service";
import { userData } from '~/models/userData.model';
import { Router } from '@angular/router';

@Injectable()
export class LoginService extends ApiService {

    private _userData: userData;
    private fileHandler: File = knownFolders.documents().getFile("data");

    constructor(protected http: HttpClient, private _router: Router) {
        super(http);
    }

    public async login(login: string, password: string){

        let data: FormData = new FormData();
        data.append("username", login);
        data.append("password", password);

        return await this.http.post<ApiResponse>(this.getUrl("post/login"), data, {headers: this.getHeaders()}).toPromise();
    }

    finalizeLogin(data: userData, isRemember: boolean){
        this._userData = data;
        if (isRemember)
            this.rememberUser(data);
        this._router.navigate(["/chat"]);
    }

    private rememberUser(data: userData){
    }

    public logout(){
        this._userData = undefined;

    }

    public isLoggedIn(): boolean{
        if (this._userData)
            return true;
        return true;
    }
}