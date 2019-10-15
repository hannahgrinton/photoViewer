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
  constructor(albumData:AlbumDataService) { }


}
