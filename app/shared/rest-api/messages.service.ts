import { Injectable } from "@angular/core";
import { HttpHeaders, HttpClient, HttpParams } from "@angular/common/http";
import { tap, map, observeOn, timestamp, delay, take, timeInterval, switchMap } from "rxjs/operators";
import { Observable, interval, BehaviorSubject } from "rxjs";

import { ApiResponse, Post } from '../../models';
import { ApiService } from "./api.service";
import { LoginService } from './login.service';

@Injectable()
export class MessagesService extends ApiService {

    private postsArray: BehaviorSubject<Array<Post>> = new BehaviorSubject<Array<Post>>([]);
    private lastUpdateTime: number = 0;
    private isRqProcessing: boolean = false;
    private intervalHandler: Observable<number>;


    constructor(protected http: HttpClient, private login: LoginService) {
        super(http);    
        this.intervalHandler = interval(1000);
        this.intervalHandler.subscribe(() => {if (!this.isRqProcessing) this.updatePosts()}); 
    }

    private async updatePosts(){
        this.isRqProcessing = true;

        const currentUpdateTime = await this.getUpdateTime().toPromise();
        
        let postsLength = this.postsArray.value.length;
        let myParams: HttpParams;
        if (postsLength > 0)
            myParams = new HttpParams().set('timestamp', this.lastUpdateTime.toString());

        let postsResponse: ApiResponse;
        if (this.lastUpdateTime !== currentUpdateTime.result){               

            await this.getPosts(myParams).toPromise().then(resolve =>{postsResponse = resolve}).catch(error =>
                console.log(error)
            );

            if (postsResponse.result.length == 0){
                //TODO usuwanie wiadomosci
            }
            else{
                this.postsArray.next(this.postsArray.getValue().concat(postsResponse.result));
            }         
            this.lastUpdateTime = currentUpdateTime.result;
        }

        this.isRqProcessing = false;
    }


    /**
     * @returns Observable<ApiResponse>
     **/
    private getUpdateTime(): Observable<ApiResponse>{
        return this.http.get<ApiResponse>(this.getUrl("get/lastUpdate"), 
            {headers: new HttpHeaders(this.getHeaders())});
    }


    /**
     * @param params: HttpParams
     * @returns Observable<ApiResponse>
     **/
    private getPosts(params?: HttpParams): Observable<ApiResponse> {
        return this.http.get<ApiResponse>(this.getUrl("get/lastPosts"), 
            {headers: new HttpHeaders(this.getHeaders()),
            params: params});
    }
  
    /**
    * @returns Observable<Array<Post>>
    **/
    public renderPosts(): Observable<Array<Post>>{
        return this.postsArray.asObservable();
    }

    public sendPost(){
        
    }
}