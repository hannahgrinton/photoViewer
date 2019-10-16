import { Component} from '@angular/core';
import { AlbumDataService } from '../albumData.service';

@Component({
  selector: 'app-jump',
  templateUrl: './jump.component.html',
  styleUrls: ['./jump.component.scss']
})
export class JumpComponent {


  constructor(public albumData:AlbumDataService) { }

  public jumpTo(index):void {
    this.albumData.image = index;
    this.albumData.setPic();
  }

  

}
