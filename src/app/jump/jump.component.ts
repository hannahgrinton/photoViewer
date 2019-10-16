import { Component} from '@angular/core';
import { AlbumDataService } from '../albumData.service';
import { MainComponent } from '../main/main.component';

@Component({
  selector: 'app-jump',
  templateUrl: './jump.component.html',
  styleUrls: ['./jump.component.scss']
})
export class JumpComponent {


  constructor(public albumData:AlbumDataService, public main:MainComponent) { }

  public jumpTo(index):void {
    this.albumData.image = index;
    this.albumData.setPic();
    this.main.buttonWatch(this.albumData.image);
  }

  

}
