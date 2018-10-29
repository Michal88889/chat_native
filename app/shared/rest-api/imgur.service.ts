import { HttpHeaders, HttpClient, HttpParams } from "@angular/common/http";
import { Image} from "ui/image";
import { takePicture, isAvailable, requestPermissions } from "nativescript-camera";
import { Injectable } from "@angular/core"
import { Observable } from 'rxjs';
import { ImageSource } from 'tns-core-modules/image-source/image-source';

@Injectable()
export class ImgurService{

    private config = {
        baseUrl: "https://api.imgur.com/3/",
        headers: {
            Authorization: ''
        }
    }

    constructor(private http: HttpClient){

    }

    public takePhoto(){
        requestPermissions();
        takePicture().then(takenImage => {
            let img = new ImageSource().fromAsset(takenImage).then(source => {
                this.uploadImage(source.toBase64String("png")).subscribe(x => console.log(x));
            });
        });
    }

    uploadImage(img: string): Observable<any>{

        let data = new FormData();
        return this.http.post("https://api.imgur.com/3/image", img, {headers: this.config.headers});
    }

}