import { Injectable } from "@angular/core";
import { HttpHeaders, HttpClient } from "@angular/common/http";
import { tap, map } from "rxjs/operators";
import { Observable } from "rxjs";
import { knownFolders, File } from "file-system";

import { ApiResponse } from '../../models';
import { ApiService } from "./api.service";
import { userData } from '~/models/userData.model';
import { Router } from '@angular/router';

@Injectable()
export class LoginService extends ApiService {
    /**
     * Asta 09.11.2018:
     * 1. _router => router, _userData => userData (camelCase wszędzie, to wszędzie)
     * 2. Jak są krótkie funkcje i nie dajesz komentarzy to nie zostawiaj niepotrzebnie wolnych linijek kodu
     * 3. Zapisywanie niezaszyfrowanych danych użytkownika w pliku to zły pomysł, najlepiej użyć specjalnych funkcji do tego stworzonych:|
     *    https://docs.nativescript.org/ns-framework-modules/application-settings
     *    + jak używasz rzeczy typu "sciezka do pliku.txt" albo nazwe zmiennej przechowywanej w jakimś value-key storage
     *    to scieżkę/nazwę wrzucaj do configa i pobieraj z configa, tego typu rzeczy powinny siedzieć w jednym miejscu
     *    
     */
    private userData: userData;
    private fileHandler: File = knownFolders.documents().getFile("data.txt");

    constructor(protected http: HttpClient, private router: Router) {
        super(http);
    }

    /**
     * @param login: String 
     * @param password 
     * @returns Observable<ApiResponse>
     */
    public login(login: string, password: string): Observable<ApiResponse> {
        let data: FormData = new FormData();
        data.append("username", login);
        data.append("password", password);

        return this.http.post<ApiResponse>(this.getUrl("post/login"), data, { headers: this.getHeaders() });
    }

    /**
     * @param data: userData
     * @param isRemembered: boolean
     */
    finalizeLogin(data: userData, isRemembered: boolean) {
        this.userData = data;
        if (isRemembered)
            this.fileHandler.writeTextSync(JSON.stringify(data), error => console.log(error));
        this.router.navigate(["/chat"]);
    }

    /**
     * @return boolean
     */
    public logout(): boolean {
        this.userData = null;
        this.fileHandler.writeTextSync("");

        //Check if file has beed removed
        if (this.fileHandler.readTextSync().length == 0) {
            this.router.navigate(["/login"]);
            return true;
        }
        else
            return false;

    }

    /**
     * @returns userData
     */
    public getUserData(): userData {
        if (this.userData)
            return this.userData;
        else {
            if (File.exists(this.fileHandler.path)) {
                let dataString = this.fileHandler.readTextSync(error => {
                    console.log(error);
                    return null;
                });
                if (dataString.length > 0) {
                    this.userData = JSON.parse(dataString);
                    return this.userData;
                }
                else
                    return null;
            }
            else
                return null;
        }
    }

    /**
     * @returns boolean
     */
    public isLoggedIn(): boolean {
        if (this.getUserData())
            return true;
        return false;
    }
}