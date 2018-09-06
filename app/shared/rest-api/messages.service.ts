import { Injectable } from "@angular/core";
import { HttpHeaders, HttpClient } from "@angular/common/http";
import { tap, map  } from "rxjs/operators";

import { ApiResponse } from '../../models';
import { ApiService } from "./api.service";
import { Observable } from "rxjs";

@Injectable()
export class MessagesService extends ApiService {

    constructor(protected http: HttpClient) {
        super(http);
    }

    /**
     * @returns Observable<ApiResponse>
     */
    public getLastMessages(): Observable<ApiResponse>
    {
        return this.http.get<ApiResponse>(
            this.getUrl('get/lastPosts'),
            { headers: new HttpHeaders(this.getHeaders()) });
    }
}