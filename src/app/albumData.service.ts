import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { JSONRoot, Photo } from './images.model';
import { MainComponent } from './main/main.component';
@Injectable() 
export class AlbumDataService {
    //json urls
    private readonly RETRIEVE_SCRIPT  = "http://www.seanmorrow.ca/_lessons/retrieveAlbum.php?id=w0420634&count=11";
    private readonly SEND_SCRIPT = "http://www.seanmorrow.ca/_lessons/addComment.php?id=w0420634";
    //controlling data
    public photos:Photo[];
    public loaded:boolean = false;
    public selected:Photo;
    public image = 0;
    //http
    private http:HttpClient;
    constructor(myHttp:HttpClient) {
        this.http = myHttp;
    }
    //------------------------------------------------------------ json sending and retrieving
    public load():void {
        //get the data from api
        this.http.get<JSONRoot>(this.RETRIEVE_SCRIPT).subscribe(
            data => {
                console.log(data);
                this.photos = data.photos;

                console.log("data received: " + this.loaded);

                this.setPic();

                
            },
            err => {
                console.log("Error retrieving album data :(");
            }
        );
    }
    public send(author:string , comment:string):void {
        //send data to api and reload page
        this.loaded = false;
        let sendJSON = {
            "photoId": this.photos[this.image].id, 
            "author": author,
            "comment": comment
        };
        let sendString = JSON.stringify(sendJSON);
        this.http.post<string>(this.SEND_SCRIPT, sendString).subscribe(
            data => {
                this.load();
            },
            err => {
                console.log("Error adding album data :(");
            }
        );
        
    }
    //--------------------------------------------------------------------------- page control
    public setPic():void {
        //image (index) will be 0 on first hit
        this.selected = this.photos[this.image];
        this.loaded = true;

        console.log("setPic: " + this.loaded);
    }
    public incrementImage():void {
        this.image++;
        this.setPic();
        
    }
    public disincrementImage():void {
        this.image--;
        this.setPic();
        
    }
}