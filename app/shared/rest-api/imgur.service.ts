import { HttpHeaders, HttpClient, HttpParams } from "@angular/common/http";
import { ImageAsset } from "image-asset";
import { takePicture, isAvailable, requestPermissions } from "nativescript-camera";
import { Injectable } from "@angular/core"

@Injectable()
export class ImgurService{

    private img: ImageAsset;

    public takePhoto(){
        console.log(isAvailable());
        requestPermissions();
        takePicture().then(takenImage => {this.img = takenImage});
    }

}