import { Config } from '../config';
import { HttpHeaders, HttpClient } from "@angular/common/http";
import { map } from "rxjs/operators";

export class ApiService {

    private baseUrl = "";
    private headers = {};

    constructor(protected http: HttpClient) {
        this.baseUrl = Config.api.url;
        this.headers = Config.api.headers;
    }

    public getUrl(route: string) {
        return this.baseUrl + route;
    }

    public getHeaders() {
        return this.headers;
    }

    public test() {
        return this.http.get(
            this.getUrl('get/randomPost'),
            { headers: new HttpHeaders(this.getHeaders()) } //auth headers (key i token)
        ).pipe(
            map(data => JSON.stringify(data)) //najpierw w locie konwertujemy wynik na JSON na wszelki wypadek
        ).subscribe(data => {
            console.log(data); // testujemy, u mnie działa
        });
    }
}