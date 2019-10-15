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

  constructor(public albumData:AlbumDataService) {}
  public ngOnInit():void {
    console.log("initializing");
    this.albumData.load();
  }
}
