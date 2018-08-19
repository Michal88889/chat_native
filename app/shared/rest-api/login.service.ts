import { Injectable } from "@angular/core";
import { HttpHeaders, HttpClient } from "@angular/common/http";
import { tap, map } from "rxjs/operators";

import { ApiResponse } from '../../models';
import { ApiService } from "./api.service";

@Injectable()
export class LoginService extends ApiService {
    constructor(protected http: HttpClient) {
        super(http);
    }

    /**
     * 
     * @param email: string
     * @param password: string
     * @returns Observable<ApiResponse>
     */
    public login(email: string, password: string) {
        return this.http.post(
            this.getUrl('post/login'),
            JSON.stringify({
                username: email,
                password: password
            }),
            { headers: new HttpHeaders(this.getHeaders()) } //auth headers (key i token)
        ).pipe(
            map(data => JSON.stringify(data)), //najpierw w locie konwertujemy wynik na JSON na wszelki wypadek
            tap((data: ApiResponse) => {
                this.rememberUser; // zapamiętaj dane usera w local storage telefonu
            })
        );
    }

    public rememberUser(data: ApiResponse) {
        if (!data.status) {
            return false;
        }
        // TODO set user data in local phone storage
        return true;
    }

    public logout() {
        // TODO remove local phone storage data about user
    }

    /**
     * Asta: Tu proponuje zrobić tak:
     * 1. Sprawdzić local storage telefonu czy user jest zalogowany
     * 2. Jeśli nie jest to false, jeśli jest to sprawdzamy timestamp ostatniego logowania
     * 3. Jesli timestamp jest większy od jakiejś wartości (np. 5 min) 
     *    to sprawdzamy przez API czy credentiale się zgadzają (token, username - chyba takie zapiszemy) i zwracamy observable
     * 4. Jeśli timestamp jest ok to boolean
     */
    public isLoggedIn() {
        return true; // TODO spr w local storage
    }
}