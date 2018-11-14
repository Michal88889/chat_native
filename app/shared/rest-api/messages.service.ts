import { Injectable } from "@angular/core";
import { HttpHeaders, HttpClient, HttpParams } from "@angular/common/http";
import { tap, map, observeOn, timestamp, delay, take, timeInterval, switchMap } from "rxjs/operators";
import { Observable, interval, BehaviorSubject } from "rxjs";

import { ApiResponse, Post } from '../../models';
import { ApiService } from "./api.service";
import { userData } from '~/models/userData.model';

@Injectable()
export class MessagesService extends ApiService {
    /**
     * Asta 09.11.2018:
     * 1. Kolejność parametrów/funkcji w klasie powinien być taki: public, protected, private
     * 2. updatePosts -> małe zmiany i podpowiedzi
     */
    private postsArray: BehaviorSubject<Array<Post>> = new BehaviorSubject<Array<Post>>([]);
    private lastUpdateTime: number = 0;
    private isRqProcessing: boolean = false;
    private intervalHandler: Observable<number>;


    constructor(protected http: HttpClient) {
        super(http);
        this.intervalHandler = interval(1000);
        this.intervalHandler.subscribe(() => { if (!this.isRqProcessing) this.updatePosts() });
    }

    /**
    * @returns Observable<Array<Post>>
    **/
    public renderPosts(): Observable<Array<Post>> {
        return this.postsArray.asObservable();
    }

    /**
     * @param messageText: string
     * @returns Observable<ApiResponse>
     */
    public sendPost(messageText: string, user: userData): Observable<ApiResponse> {
        console.log(user);
        let rqBody: FormData = new FormData();

        Object.keys(user).map(el => rqBody.append(el, user[el]));
        rqBody.append("text", messageText);
        return this.http.post<ApiResponse>(this.getUrl("post/addPost"), rqBody, { headers: new HttpHeaders(this.getHeaders()) });
    }

    private async updatePosts() {
        this.isRqProcessing = true;
        const currentUpdateTime = await this.getUpdateTime().toPromise();
        /**
        * Asta 09.11.2018
        * To według mnie jest niepotrzebne:
        let postsLength = this.postsArray.value.length;
        let myParams: HttpParams;
        if (postsLength > 0)
            myParams = new HttpParams().set('timestamp', this.lastUpdateTime.toString());
        */
        let postsResponse: ApiResponse;
        if (this.lastUpdateTime !== currentUpdateTime.result) {
            let myParams = new HttpParams().set('timestamp', this.lastUpdateTime.toString());
            await this.getPosts(myParams).toPromise().then(resolve => { postsResponse = resolve }).catch(error =>
                console.log(error)
            );

            if (this.lastUpdateTime && postsResponse.result.length == 0) {
                //TODO usuwanie wiadomosci
                /** Asta 09.11.2018
                 *  Tutaj wywołaj nową funkcję do usuwania, żeby ta nie było zbyt długa
                 *  generalnie funkcje w idealnym świecie powinny mieć do 30 linjek kodu
                 */
            } else {
                this.postsArray.next(this.postsArray.getValue().concat(postsResponse.result));
            }
            this.lastUpdateTime = currentUpdateTime.result;
        }
        this.isRqProcessing = false;
    }


    /**
     * @returns Observable<ApiResponse>
     **/
    private getUpdateTime(): Observable<ApiResponse> {
        return this.http.get<ApiResponse>(this.getUrl("get/lastUpdate"),
            { headers: new HttpHeaders(this.getHeaders()) });
    }


    /**
     * @param params: HttpParams
     * @returns Observable<ApiResponse>
     **/
    private getPosts(params?: HttpParams): Observable<ApiResponse> {
        return this.http.get<ApiResponse>(this.getUrl("get/lastPosts"),
            {
                headers: new HttpHeaders(this.getHeaders()),
                params: params
            });
    }
}