import { Component, OnInit } from '@angular/core';
import { AlbumDataService } from './albumData.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [ AlbumDataService ]
})
export class AppComponent implements OnInit {
  title = 'PhotoViewer';

  //get things up and running
  constructor(public albumData:AlbumDataService) {}
  public ngOnInit():void {
    this.albumData.load();
  }
}
