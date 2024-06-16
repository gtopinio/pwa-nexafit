import { Component, OnInit } from '@angular/core';
import { fade1s } from "../../../libraries/animation";

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css'],
  animations: [
    fade1s
  ]
})
export class LandingComponent implements OnInit {
  onLaunchCountdown: number = 1;
  hasAnimationEnded: boolean = false;

  constructor() {
  }

  ngOnInit() {
    this.startLaunchCountdown();
  }

  startLaunchCountdown() {
    setInterval(() => {
      this.onLaunchCountdown--;
      if (this.onLaunchCountdown === 0) {
        this.hasAnimationEnded = true;
      }
    }, 1000);
  }
}
