import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import {FormsModule,ReactiveFormsModule} from '@angular/forms';
import { AlbumDataService } from '../albumData.service';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss']
})
export class CommentComponent {
  //form data
  commentForm: FormGroup;
  private author:string;
  private comment:string;

  //this component controls the comment panel functionality
  constructor(public albumData:AlbumDataService) { 
    //build form
    this.commentForm = this.createFormGroup();
    this.author = "";
    this.comment = "";
  }

  private createFormGroup() {
    //validation for form elements
    return new FormGroup({
      author: new FormControl('', [Validators.required]),
      comment: new FormControl('', [Validators.required])
    });
  }

  public revert() {
    //cancel button
    this.commentForm.reset();
  }
  public onSubmit() {
    //submit button - calls send from album data service
    this.author = this.commentForm.get('author').value;
    this.comment = this.commentForm.get('comment').value;
    console.log(this.author + " " + this.comment);
    this.albumData.send(this.author, this.comment);
    this.revert();
  }
}
