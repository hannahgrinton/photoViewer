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
    public image = 0;
    constructor(myHttp:HttpClient) {
        this.http = myHttp;
    }
    public load():void {
        console.log("LoadingData! :)");

        this.http.get<JSONRoot>(this.RETRIEVE_SCRIPT).subscribe(
            data => {
                console.log(data);
                this.photos = data.photos;
                this.selected = this.photos[0];
                this.loaded = true;
                console.log(this.selected);
            },
            err => {
                console.log("Error retrieving album data :(");
            }
        );
    }
    private setPic():void {
        this.selected = this.photos[this.image];
    }
    public incrementImage():void {
        this.image++;
        if (this.image <= this.photos.length) {
            this.setPic();
        } else {
            this.image--;
        }
        
    }
    public disincrementImage():void {
        this.image--;
        if (this.image > 0 ) {
            this.setPic();
        } else {
            this.image++;
        }
        
    }
}