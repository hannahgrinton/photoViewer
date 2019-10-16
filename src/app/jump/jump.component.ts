import { Component} from '@angular/core';
import { AlbumDataService } from '../albumData.service';
import { MainComponent } from '../main/main.component';

@Component({
  selector: 'app-jump',
  templateUrl: './jump.component.html',
  styleUrls: ['./jump.component.scss']
})
export class JumpComponent {
  //this component controls the jump panel functionality
  constructor(public albumData:AlbumDataService, public main:MainComponent) { }

  public jumpTo(index):void {
    //set page with new pic
    this.albumData.image = index;
    this.albumData.setPic();
    //check buttons - hacky but it works :D
    this.main.buttonWatch(this.albumData.image);
  }

  

}
