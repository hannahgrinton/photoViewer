import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { JSONRoot, Photo } from './images.model';
@Injectable() 
export class AlbumDataService {
    private readonly RETRIEVE_SCRIPT  = "http://www.seanmorrow.ca/_lessons/retrieveAlbum.php?id=w0420634&count=11";
    public photos:Photo[];
    private loaded:boolean = false;
    public selected:Photo;
    private http:HttpClient;
    constructor(myHttp:HttpClient) {
        this.http = myHttp;
    }
    public load():void {
        console.log("LoadingData! :)");

        this.http.get<JSONRoot>(this.RETRIEVE_SCRIPT).subscribe(
            data => {
                //success!!
                console.log(data);
                this.photos = data.photos;
                //target first sample in the array by default
                this.selected = this.photos[0];
                this.loaded = true;
                console.log("test: " + this.photos.length);
            },
            err => {
                console.log("Error retrieving portfolio data :(");
            }
        );
    }
}