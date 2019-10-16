import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import {FormsModule,ReactiveFormsModule} from '@angular/forms';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss']
})
export class CommentComponent {

  commentForm: FormGroup;
  private author:string = "";
  private comment:string = "";
  constructor() { 
    this.commentForm = this.createFormGroup();
  }

  private createFormGroup() {
    return new FormGroup({
      author: new FormControl('', [Validators.required]),
      comment: new FormControl('', [Validators.required])
    });
  }

  public revert() {
    this.commentForm.reset();
  }
  public onSubmit() {
    this.author = this.commentForm.get('author').value;
    this.comment = this.commentForm.get('comment').value;
    console.log(this.author + " " + this.comment);

    this.revert();
  }
}
