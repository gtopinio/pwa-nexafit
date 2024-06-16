import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-form-header',
  templateUrl: './form-header.component.html',
  styleUrls: ['./form-header.component.css']
})
export class FormHeaderComponent implements OnInit{
  @Input() caption!: string;
  @Input() imagePath!: string;
  imageWidth!: number;
  imageHeight!: number;

  constructor() {
  }

  ngOnInit() {
    if(!this.imagePath){
      this.initializeImageDimensions(this.imagePath);
    }
  }

  initializeImageDimensions(imagePath: string) {
    const image = new Image();
    image.src = imagePath;
    this.imageWidth = image.width;
    this.imageHeight = image.height;
  }

}
