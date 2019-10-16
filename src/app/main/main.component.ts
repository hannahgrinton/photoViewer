import { Component } from '@angular/core';
import { AlbumDataService } from './../albumData.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent {
  //this will allow enabling and disabling of the buttons and panels
  public showJump:boolean = false;
  public showComment:boolean = false;
  public btnNext:boolean = false;
  public btnPrevious:boolean = true;
  //this component controls the main section of the page - image shown, caption, etc
  constructor(public albumData:AlbumDataService) {}

  public jumpButton():void {
    //can we see the jump panel please?
    if (this.showJump == false) {
      this.showJump = true; 
    } else {
      this.showJump = false;
    }
  }
  public commentButton():void {
    //can we see the comment panel please?
    if (this.showComment == false) {
      this.showComment = true;
    } else {
      this.showComment = false;
    }
    
  }
  public nextImage():void {
    //can we see the next image please? ...i'm starting to soung like gollum... we needs to sees it!!
    this.albumData.incrementImage();
    this.buttonWatch(this.albumData.image);
  }
  public previousImage():void {
    //no wait go back to the last image, i wanna see it again!
    this.albumData.disincrementImage();
    this.buttonWatch(this.albumData.image);
  }

  public buttonWatch(i) {
    //control the buttons
    if (i <= 0) {
      //disable
      this.btnPrevious = true;
    } else {
      //enable
      this.btnPrevious = false;
    }
    if ((i+1) >= this.albumData.photos.length) {
      //disable
      this.btnNext = true;
    } else {
      //enable
      this.btnNext = false;
    }
  }
}
