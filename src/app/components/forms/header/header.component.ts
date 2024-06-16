import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit{
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
