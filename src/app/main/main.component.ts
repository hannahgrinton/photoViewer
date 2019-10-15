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
}
