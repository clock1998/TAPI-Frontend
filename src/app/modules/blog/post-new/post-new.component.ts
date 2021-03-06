import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { BlogService } from 'src/app/core/services/blog.service';
import { UserService } from 'src/app/core/services/user.service';
import { Post } from 'src/app/shared/models/post';
import * as Editor from 'src/assets/ckeditor5/build/ckeditor';

@Component({
  selector: 'app-post-new',
  templateUrl: './post-new.component.html',
  styleUrls: ['./post-new.component.scss']
})
export class PostNewComponent implements OnInit {
    newPostForm: FormGroup;
    formError:String;
    public Editor = Editor;
    CKEditorConfig = {
        toolbar: {
            items: [
                'heading',
                'undo',
                'redo',
                '|',
                'bold',
                'italic',
                'bulletedList',
                'numberedList',
                'alignment',
                'fontColor',
                'fontSize',
                'fontFamily',
                'horizontalLine',
                'strikethrough',
                'underline',
                '|',
                'indent',
                'outdent',
                '|',
                'imageUpload',
                'blockQuote',
                'insertTable',
                'mediaEmbed',
                'codeBlock',
                'highlight'
            ]
        },
        language: 'en',
        image: {
            toolbar: [
                'imageTextAlternative',
                'imageStyle:full',
                'imageStyle:side'
            ]
        },
        table: {
            contentToolbar: [
                'tableColumn',
                'tableRow',
                'mergeTableCells',
                'tableCellProperties',
                'tableProperties'
            ]
        },
        licenseKey: '',
    }

  constructor(private blogService: BlogService,private userService: UserService) { }

  ngOnInit(): void {
    this.newPostForm = new FormGroup({
        title: new FormControl('', Validators.required),
        content: new FormControl('', Validators.required)
    });
  }

  get title() { return this.newPostForm.get('title'); }

  get content() { return this.newPostForm.get('content'); }

  onPostSubmit(){
    let newPost = new Post;
    newPost.title = this.newPostForm.get('title').value;
    newPost.content = this.newPostForm.get('content').value;
    newPost.user = this.userService.UserInfo;
    console.log(JSON.stringify(newPost));
    let post = JSON.stringify(newPost);
    this.blogService.create(post).subscribe((res) => {
        this.newPostForm.reset();
        console.log(res);
    },
    (err) => {
        if(err.title){
            this.formError = "Title:" + err.title;
        }
        if(err.content){
            this.formError = this.formError + "Content:" + err.content;
        }
    });
}
}
