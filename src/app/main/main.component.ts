import { Component } from '@angular/core';
import { AlbumDataService } from './../albumData.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent {

  public showJump:boolean = false;
  public showComment:boolean = false;
  public btnNext:boolean = false;
  public btnPrevious:boolean = true;
  constructor(public albumData:AlbumDataService) {}

  public jumpButton():void {
    if (this.showJump == false) {
      this.showJump = true; 
    } else {
      this.showJump = false;
    }
  }
  public commentButton():void {
    if (this.showComment == false) {
      this.showComment = true;
    } else {
      this.showComment = false;
    }
    
  }
  public nextImage():void {
    this.albumData.incrementImage();
    if ((this.albumData.image + 1) == this.albumData.photos.length) {
      //disable
      this.btnNext = true;
    }else {
      //enable
      this.btnNext = false;
      if (this.albumData.image > 0) {
        this.btnPrevious = false;
      } else {
        this.btnPrevious = true;
      }
    }
  }
  public previousImage():void {
    this.albumData.disincrementImage();
    if (this.albumData.image == 0){
      //disable
      this.btnPrevious = true;
    } else {
      //enable
      this.btnPrevious = false;
      if (this.albumData.image <= this.albumData.photos.length) {
        this.btnNext = false;
      } else {
        this.btnNext = true;
      }
    }
  }
}
