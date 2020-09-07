import { Component, OnInit, Input, EventEmitter, Output, OnChanges, SimpleChanges } from '@angular/core';
import { Image } from 'src/app/shared/models/image';
import { GalleryService } from 'src/app/core/services/gallery.service';
import { Tag } from 'src/app/shared/models/tag';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
	selector: 'app-image',
	templateUrl: './image.component.html',
	styleUrls: [ './image.component.scss' ]
})
export class ImageComponent implements OnInit, OnChanges {
    @Input() image: Image;
    @Input() editMode: boolean;
    @Input() tags: Tag[];
    @Output() clickedImageEmitter: EventEmitter<Image> = new EventEmitter<Image>();
    @Output() deleteImageEmitter: EventEmitter<Image> = new EventEmitter<Image>();
    showDeleteButton:boolean = false;

	isLightBoxShown: boolean = false;
    imageUrl: string = '';
    description: string = '';
    uploadImageForm: FormGroup;
    file:File;
	constructor(private galleryService: GalleryService, private formBuilder: FormBuilder) {}


	ngOnInit(): void {
        this.showDeleteButton=this.editMode;
        this.uploadImageForm = this.formBuilder.group({
            image: [''],
            description: [this.image.description],
            tags:[this.image.tags]
        })
    }

    ngOnChanges(changes: SimpleChanges): void {
        
    }

	showLightBox(image:Image): void {
		this.clickedImageEmitter.emit(image);
    }
    
    deleteButtonClick( image:Image):void{
        this.deleteImageEmitter.emit(image);
    }


    onImageSelect(event) {
        if (event.target.files.length > 0) {
            this.file = event.target.files[0];
            // this.uploadImageForm.get('image').setValue(file);
        }
    }

    onImageSubmit() {
        const formData = new FormData();
        formData.append('file', this.file, this.file.name);
        formData.append('name', this.file.name);
        formData.append('description', this.uploadImageForm.get('description').value);
        if(this.uploadImageForm.get('tags').value){
            this.uploadImageForm.get('tags').value.forEach(element => {
                formData.append('tags', element);    
            });
        }
        
        this.galleryService.uploadImage(formData).subscribe(
            (res) => {
                console.log(res);
                console.log(this.imageUrl);
            },
            (err) => {
                console.log(err);
            }
        );
    }
}
